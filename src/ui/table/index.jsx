import React from 'react';
import './styles.css';

export default function Table({ data, renderHead, renderItem }) {
  return (
    <div className="table-container">
      <table className="table-match-history">
        <thead>{renderHead()}</thead>
        <tbody>{data.map((row) => renderItem(row))}</tbody>
      </table>
    </div>
  );
}
