import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Dropdown from '../../ui/dropdown';

import { apiFetch } from '../../modules/api-fetch';
import { toValueLabel } from '../../modules/object';

import weightClasses from '../../data/weight-classes.json';
import matchTypes from '../../data/match-types.json';
import communities from '../../data/communities.json';

import Button from '../../ui/button';
import Banner from '../../ui/banner';

import './styles.css';

export default function PlayerSearch({ }) {
  const [players, setPlayers] = useState([]);
  const [giNoGi, setGiNoGi] = useState(Object.keys(matchTypes)[0]);
  const [weightClass, setWeightClass] = useState(Object.keys(weightClasses)[0]);
  const [community, setCommunity] = useState(Object.keys(communities)[0]);

  useEffect(() => {
    apiFetch('players').then((json) => setPlayers(json.players));
  }, []);

  function search(players) {
    return sortByWeightClass(sortByGiNoGi(sortByCommunity(players)));
  }

  function sortByCommunity(players) {
    return players.filter((player) => player.community === community);
  }

  function sortByGiNoGi(playersSortedByGiNoGi) {
    return playersSortedByGiNoGi.sort((a, b) => b[giNoGi] - a[giNoGi]);
  }

  function sortByWeightClass(communityPlayersSortedByGiNoGi) {
    if (weightClass === 'OpenWeight') return communityPlayersSortedByGiNoGi;
    return communityPlayersSortedByGiNoGi.filter(
      (player) => player.weightClass === weightClass
    );
  }

  const getMedalForPlayer = (index) => {
    const imageNames = ['gold.png', 'silver.png', 'bronze.png'];
    return imageNames[index] ? (
      <img src={`assets/images/${imageNames[index]}`} className="info-medal" />
    ) : (
        <div className="info-no-medal">{index + 1}</div>
      );
  };

  const found = search(players);
  return (
    <div>
      <Banner />
      <div
        className="dropdown-wrapper"
      >
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
      {found.length > 0
        ? found.map((player, i) => {
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
                  <div className="info-title">
                    {firstName} {lastName}
                  </div>
                  <div className="info-weight">{weightClass}</div>
                  <div className="info-record">
                    <div className="record-type">
                      <div className="record-title">Win:</div>
                      <div className="record-win">{wins}</div>
                    </div>
                    <div className="record-type">
                      <div className="record-title">Loss:</div>
                      <div className="record-loss">{losses}</div>
                    </div>
                    <div className="record-type">
                      <div className="record-title">Draw:</div>
                      <div className="record-draw">{draws}</div>
                    </div>
                  </div>
                  {giNoGi === 'nogi' ? (
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
                    <div className="school">School:</div>
                    <div className="school-name">{school}</div>
                  </div>
                  {getMedalForPlayer(i)}
                </div>
              </div>
            </Link>
          );
        })
        : <div className="empty-search">There are no fighters in that weight class</div>}
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
