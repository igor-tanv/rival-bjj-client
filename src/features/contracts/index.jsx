import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import { Link } from 'react-router-dom';

import Button from '../../ui/button';
import DateTimePicker from '../../ui/date-time-picker';
import HoriztonalList from '../../ui/horizontal-list';
import ContractTable from '../../ui/table';
import matchTypes from '../../data/match-types.json';

import { apiFetch } from '../../modules/api-fetch';

import PDFContract from './pdf-contract';

import './styles.css';

export default function Contracts() {
  const [contracts, setContracts] = useState([]);
  const filters = [
    'All',
    'Sent',
    'Received',
    'Declined',
    'Accepted',
    'Cancelled',
  ];
  const [filter, setFilter] = useState(filters[0]);
  const [openDetails, setOpenDetails] = useState(false);
  const [selectedContract, setSelectedContract] = useState(null);

  useEffect(() => {
    apiFetch(`contracts?playerId=${localStorage.getItem('playerId')}`).then(
      (json) => {
        setContracts(json.contracts);
      }
    );
  }, []);

  // can we combine accept and decline into a single fucntion?
  function accept() {
    apiFetch(`contracts/${selectedContract.id}/accept`, 'post').then((json) => {
      updateContractStatus(json.contract.status);
    });
  }

  function decline() {
    apiFetch(`contracts/${selectedContract.id}/decline`, 'post').then(
      (json) => {
        updateContractStatus(json.contract.status);
      }
    );
  }

  function cancel() {
    apiFetch(`contracts/${selectedContract.id}/cancel`, 'post', {
      playerId: localStorage.getItem('playerId'),
    }).then((json) => {
      updateContractStatus(json.contract.status);
    });
  }

  function updateContractStatus(status) {
    setContracts((prev) =>
      prev.map((contract) =>
        contract.id === selectedContract.id
          ? {
              ...contract,
              status: status,
            }
          : contract
      )
    );
    setSelectedContract(null);
    setOpenDetails(false);
  }

  function filterBy(contracts) {
    if (filter === 'All') return contracts;
    return contracts.filter((contract) => {
      if (
        filter === 'Sent' &&
        localStorage.getItem('playerId') === contract.playerId &&
        contract.status === 'sent'
      )
        return contract;
      if (
        filter === 'Received' &&
        localStorage.getItem('playerId') !== contract.playerId &&
        contract.status === 'sent'
      )
        return contract;
      if (filter === 'Declined' && contract.status === 'declined')
        return contract;
      if (filter === 'Accepted' && contract.status === 'accepted')
        return contract;
      if (filter === 'Cancelled' && contract.status === 'cancelled')
        return contract;
    });
  }

  const saveAsPdf = () => {
    const doc = new jsPDF();
    const contractDetail = window.document.getElementById('contract-jumbotron');
    doc.html(contractDetail, {
      callback: function (doc) {
        doc.save('contract-detail');
      },
      html2canvas: {
        scale: 0.19,
      },
      x: 10,
      y: 10,
    });
  };

  function fullName(firstName, lastName) {
    return firstName + ' ' + lastName;
  }

  return (
    <div className="my-contract-container">
      <h1>My contracts</h1>

      <HoriztonalList
        items={filters}
        renderItem={(item) => (
          <span
            key={item}
            className={filter === item ? 'active' : ''}
            onClick={() => setFilter(item)}
          >
            {item}
          </span>
        )}
      />

      <ContractTable
        data={filterBy(contracts)}
        renderHead={() => {
          return (
            <tr>
              <td>
                <div className="col-head">Opponent</div>
              </td>
              <td>
                <div className="col-head">Match type</div>
              </td>
              <td>
                <div className="col-head">Date</div>
              </td>
              <td>
                <div className="col-head">Location</div>
              </td>
              {filter === 'Received' || filter === 'Accepted' ? (
                <td className="col-head"></td>
              ) : null}
            </tr>
          );
        }}
        renderItem={(contract) => {
          console.log(contract);

          return (
            <tr key={contract.id}>
              <td>
                <div className="row-container">
                  <div className="first-row text-truncation-second-line">
                    {localStorage.getItem('playerId') === contract.playerId
                      ? fullName(
                          contract.opponentFirstName,
                          contract.opponentLastName
                        )
                      : fullName(
                          contract.playerFirstName,
                          contract.playerLastName
                        )}
                  </div>
                </div>
              </td>
              <td>
                <div className="single-row text-truncation-second-line">
                  {matchTypes[contract.type]}
                </div>
              </td>
              <td>
                <div className="row-container">
                  <div className="first-row text-truncation-second-line">
                    <DateTimePicker
                      className="react-datepicker-no-border"
                      dateFormat="MMMM d, yyyy"
                      selected={contract.startsAt}
                      readOnly
                    />
                  </div>
                </div>
              </td>
              <td>
                <div className="single-row text-truncation-second-line">
                  {contract.location}
                </div>
              </td>
              {filter === 'Received' || filter === 'Accepted' ? (
                <td>
                  <div className="single-row text-truncation-second-line">
                    {
                      <Button
                        onClick={() => {
                          setSelectedContract(contract);
                          setOpenDetails(true);
                        }}
                      >
                        See details
                      </Button>
                    }
                  </div>
                </td>
              ) : null}
            </tr>
          );
        }}
      />

      <div
        style={{
          display: openDetails ? 'block' : 'none',
        }}
        className="issue-challenge-popup"
      >
        <div id="contract-detail">
          <h3>
            {selectedContract && selectedContract.playerFirstName} vs.{' '}
            {selectedContract && selectedContract.opponentFirstName}
          </h3>

          <p className="title">
            Where:{' '}
            <span className="info text-truncation-second-line">
              {selectedContract && selectedContract.location}
            </span>
          </p>
          <p className="title">
            When:{' '}
            <span className="info">
              {selectedContract && selectedContract.startsAt ? (
                <DateTimePicker
                  className="date-picker"
                  dateFormat="MMMM d, yyyy h:mm aa"
                  selected={selectedContract.startsAt}
                  readOnly
                />
              ) : null}
            </span>
          </p>
          <p className="title">
            Type:{' '}
            <span className="info text-truncation-second-line">
              {selectedContract && selectedContract.type}
            </span>
          </p>
          <p className="title">
            Weightclass:{' '}
            <span className="info text-truncation-second-line">
              {selectedContract && selectedContract.weightClass}
            </span>
          </p>
          <p className="title">
            Rule Exceptions:{' '}
            <span className="info text-truncation-second-line">
              {selectedContract && selectedContract.ruleExceptions}
            </span>
          </p>
          <p className="title">
            Referee:{' '}
            <span className="info text-truncation-second-line">
              {selectedContract && selectedContract.refereeName}
            </span>
          </p>

          <div className="close-wrapper">
            <Link onClick={() => setOpenDetails(false)}>
              <img src="/assets/images/close.png" className="close-btn" />
            </Link>
          </div>
        </div>

        {filter === 'Accepted' ? (
          <div className="contract-action">
            <Button isSecondary onClick={cancel} className="pad-10">
              Cancel Match
            </Button>
            <Button onClick={saveAsPdf}>Print PDF</Button>
          </div>
        ) : (
          <div className="contract-action">
            <Button onClick={accept}>Accept</Button>
            <Button isSecondary onClick={decline}>
              Decline
            </Button>
          </div>
        )}
      </div>

      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          display: openDetails ? 'block' : 'none',
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0,0,0,0.8)',
          zIndex: 99,
        }}
      />
      {selectedContract ? (
        <PDFContract selectedContract={selectedContract} />
      ) : null}
    </div>
  );
}
