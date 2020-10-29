import React from 'react';
import './SetTimer.css';

const SetTimer = ({ type, title, value, handleSetTimers }) => {
    return (
      <div className='SetTimers'>
        <div id={`${type}-label`}>{title}</div>
        <div className='SetTimer-Buttons'>
          <button id={`${type}-decrement`} onClick={() => handleSetTimers(false, `${type}Default`)}>
            <i class="fas fa-caret-down" />
          </button>
          <div id={`${type}-length`}>{value}</div>
          <button id={`${type}-increment`} onClick={() => handleSetTimers(true, `${type}Default`)}>
            <i class="fas fa-caret-up" />
          </button>
        </div>
      </div>
    );
}

export default SetTimer;
