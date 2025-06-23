import Test from './components/Test.jsx';
import './styles/App.css';
import BackgroundLayout from './components/BackgroundLayout.jsx';
import Greetings from './components/Greetings/Greetings.jsx';
import SelectContentBtn from './components/MainContent/SelectContentBtn.jsx';
import MainContent from './components/MainContent/MainContentCard.jsx'

function App() {
  return (
    <BackgroundLayout>
      <MainContent />
    </BackgroundLayout>
  );
}

export default App;
