import {useState, useEffect} from 'react';
import axios from 'axios';
import Radar from './Radar';
import radarBg from './assets/radar.png';

function App() {
  return (
    <div
      className="App"
      style={{
        width: '1920px',
        height: '1080px',
        background: `url(${radarBg}) center center / cover no-repeat fixed`,
        overflow: 'hidden',
        position: 'relative',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Radar />
    </div>
  );
}

export default App;