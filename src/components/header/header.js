import React from 'react';

import './header.css';

const Header = ({ onServiceChange }) => {
  return (
    <div className="header d-flex">
      <h3>
        <a href="#">
          StarDB
        </a>
      </h3>
      <ul className="d-flex">
        <li>
          <a href="#">People</a>
        </li>
        <li>
          <a href="#">Planets</a>
        </li>
        <li>
          <a href="#">Starships</a>
        </li>
        <button
          className="btn btn-primary btn-sm"
          onClick={onServiceChange} >
          Change service
        </button>
      </ul>
    </div>
  );
};

export default Header;
