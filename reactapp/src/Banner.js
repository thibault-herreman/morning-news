import React from 'react';
import './App.css';
import {Menu, Icon} from 'antd'

function Banner() {

  return (
    <div className="Banner">
      <button className="resetBtn">
        <img className="w-drap" src="/images/france.png" alt="drapeau français" />
      </button>
      <button className="resetBtn">
        <img className="w-drap" src="/images/anglais.png" alt="drapeau anglais" />
      </button>
    </div>
  );
}

export default Banner;