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

export default function PlayerSearch({}) {
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
  // <Dropdown
  //         options={toValueLabel(matchTypes)}
  //         onChange={setGiNoGi}
  //         value={giNoGi}
  //       />
  //       <Dropdown
  //         options={toValueLabel(weightClasses)}
  //         onChange={setWeightClass}
  //         value={weightClass}
  //       />

  const found = search(players);
  return (
    <div>
      <Banner />
      <div
        style={{
          display: 'flex',
        }}
      >
        <Dropdown
          options={toValueLabel(communities)}
          onChange={setCommunity}
          value={community}
        />

      </div>
      {found.length > 0
        ? found.map((player) => {
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
              <Link to={`/profiles/${_id}`}>
                <div key={player._id} className="item-container">
                  <img
                    className="info-avatar"
                    src={avatar ? avatar : `assets/images/test-image.png`}
                    alt=""
                  />
                  <div className="info-wrapper">
                    <div className="info-title">
                      {firstName} {lastName}
                    </div>
                    <div className="info-weight">{weightClass}</div>
                    <div className="info-record">
                      Win: {wins} Loss: {losses} Draw: {draws}
                    </div>
                    <div className="info-rank">
                      <span className="rank-type">Nogi Rank:</span>
                      <span className="rank-score">#{nogi}</span>
                    </div>
                    <div className="info-school">
                      <span className="school">School:</span>
                      <span className="school-name">{school}</span>
                    </div>

                    <Link to={`/profiles/${_id}`} className="profile-link">
                      <img src="assets/images/profile-link-arrow.png" className="arrow"/>
                      Visit Profile
                    </Link>
                    <img src="assets/images/gold.png" className="info-medal" />
                  </div>
                </div>
              </Link>
            );
          })
        : 'There are no fighters in that weight class'}
    </div>
  );
}
