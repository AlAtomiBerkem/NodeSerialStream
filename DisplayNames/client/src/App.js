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
      <div
        style={{
          position: 'absolute',
          scale: 1.773,
          top: 530,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'url(/svstrelka.svg) center center / contain no-repeat',
          animation: 'radar-sweep 3s linear infinite',
          pointerEvents: 'none',
          zIndex: 10,
        }}
      />
    </div>
  );
}

export default App;