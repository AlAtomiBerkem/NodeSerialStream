import Radar from './Radar';
import radarBg from './assets/radar.png';
import Users from './Users.jsx';
import './index.css';


function App() {
  return (
    <div
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
      <Users />
      <Radar />
    </div>
  );
}

export default App;