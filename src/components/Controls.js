import React from 'react';
import './Controls.css';

const Controls = ({ active, handleReset, handlePlayPause }) => {
    return (
      <div className='Controls'>
        <button id='start_stop' onClick={handlePlayPause} style={{fontSize: 17}}>
          { active ? <span><i class="fas fa-pause-circle"></i></span> : <span><i class="fas fa-play-circle"></i></span> }
        </button>
        <button id='reset' onClick={handleReset}><i class="fas fa-undo"></i></button>
     </div>
    );
}

export default Controls;
  