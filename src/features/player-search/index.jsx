import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Dropdown from "../../ui/dropdown";

import { apiFetch } from "../../modules/api-fetch";
import { toValueLabel } from "../../modules/object";

import weightClasses from "../../data/weight-classes.json";
import matchTypes from "../../data/match-types.json";
import communities from "../../data/communities.json";

import Button from "../../ui/button";
import Banner from "../../ui/banner";

import "./styles.css";

export default function PlayerSearch({ }) {
  const [players, setPlayers] = useState([]);
  const [giNoGi, setGiNoGi] = useState(Object.keys(matchTypes)[0]);
  const [weightClass, setWeightClass] = useState(Object.keys(weightClasses)[0]);
  const [community, setCommunity] = useState(Object.keys(communities)[0]);

  useEffect(() => {
    apiFetch("players").then((json) => setPlayers(json.players));
  }, []);

  function search(players) {
    return sortByWeightClass(sortByGiNoGi(sortByCommunity(players)));
  }

  function sortByCommunity(players) {
    return players.filter((player) => player.community === community);
  }

  function sortByGiNoGi(playersSortedByGiNoGi) {
    return playersSortedByGiNoGi.sort((a, b) => {
      const aTotalMatches = a.wins + a.draws + a.losses;
      const bTotalMatches = b.wins + b.draws + b.losses;
      if (aTotalMatches === 0 && bTotalMatches > 0) return 1;
      if (aTotalMatches > 0 && bTotalMatches === 0) return -1;
      return b[giNoGi] - a[giNoGi];
    });
  }

  function sortByWeightClass(communityPlayersSortedByGiNoGi) {
    if (weightClass === "OpenWeight") return communityPlayersSortedByGiNoGi;
    return communityPlayersSortedByGiNoGi.filter(
      (player) => player.weightClass === weightClass
    );
  }

  const getMedalForPlayer = (player, ranksWithMedal) => {
    const imageNames = ["gold.png", "silver.png", "bronze.png"];
    const totalMatch = player.wins + player.draws + player.losses;
    if (totalMatch) {
      const index = ranksWithMedal.indexOf(player[giNoGi]);
      return index <= 2 ? (
        <img
          src={`assets/images/${imageNames[index]}`}
          className="info-medal"
        />
      ) : (
          <div className="info-no-medal">{index + 1}</div>
        );
    }
    return null;
  };

  const found = search(players);
  const ranksWithMedal = [
    ...new Set(
      found
        .filter((player) => player.wins + player.draws + player.losses)
        .map((player) => player[giNoGi])
    ),
  ].sort((a, b) => b - a);
  return (
    <div>
      <Banner />
      <div className="dropdown-wrapper">
        <Dropdown
          options={toValueLabel(communities)}
          onChange={setCommunity}
          value={community}
        />
        <Dropdown
          options={toValueLabel(matchTypes)}
          onChange={setGiNoGi}
          value={giNoGi}
        />
        <Dropdown
          options={toValueLabel(weightClasses)}
          onChange={setWeightClass}
          value={weightClass}
        />
      </div>
      {found.length > 0 ? (
        found.map((player, i) => {
          const {
            _id,
            firstName,
            lastName,
            weightClass,
            wins,
            losses,
            draws,
            avatar,
            nogi,
            gi,
            school,
          } = player;
          return (
            <Link key={i} to={`/profiles/${_id}`}>
              <div key={player._id} className="item-container">
                <img
                  className="info-avatar"
                  src={avatar ? avatar : `assets/images/default.png`}
                  alt=""
                />
                <div className="info-wrapper">
                  <div className="info-title text-truncation">
                    {firstName} {lastName}
                  </div>
                  <div className="info-weight">
                    <span className="text-truncation">{weightClass}</span>
                  </div>
                  <div className="info-record">
                    Win: {wins} Loss: {losses} Draw: {draws}
                  </div>
                  {giNoGi === "nogi" ? (
                    <div className="info-rank">
                      <div className="rank-type">Nogi Rank:</div>
                      <div className="rank-score">{nogi}</div>
                    </div>
                  ) : (
                      <div className="info-rank">
                        <div className="rank-type">Gi Rank:</div>
                        <div className="rank-score">{gi}</div>
                      </div>
                    )}
                  <div className="info-school">
                    <div className="school">Team:</div>
                    <div className="school-name text-truncation">{school}</div>
                  </div>
                  {getMedalForPlayer(player, ranksWithMedal)}
                </div>
              </div>
            </Link>
          );
        })
      ) : (
          <div className="empty-search">
            There are no fighters in that weight class
          </div>
        )}
    </div>
  );
}

// <Link to={`/profiles/${_id}`} className="profile-link">
//                       <img
//                         src="assets/images/profile-link-arrow.png"
//                         className="arrow"
//                       />
//                       Visit Profile
//                     </Link>
