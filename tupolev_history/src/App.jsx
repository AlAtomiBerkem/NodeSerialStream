import Test from './components/Test.jsx';
import './styles/App.css';
import BackgroundLayout from './components/BackgroundLayout.jsx';
import Greetings from './components/Greetings/Greetings.jsx';

function App() {
  return (
    <BackgroundLayout>
      <Greetings />
    </BackgroundLayout>
  );
}

export default App;
