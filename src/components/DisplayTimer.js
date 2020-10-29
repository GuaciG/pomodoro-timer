import React from 'react';
import './DisplayTimer.css';

const DisplayTimer = ({ modeType, time }) => {
    return(
      <div className='Timer'>
        <h1 id='timer-label'>{modeType === 'session' ? 'Session' : 'Break'}</h1>
        <h1 id='time-left'>{time}</h1>
      </div>
    ); 
}

export default DisplayTimer;