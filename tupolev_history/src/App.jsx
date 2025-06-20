import Test from './components/Test.jsx';
import './styles/App.css';
import BackgroundLayout from './components/BackgroundLayout.jsx';
import Greetings from './components/Greetings/Greetings.jsx';
import SelectContentBtn from './components/MainContent/SelectContentBtn.jsx';

function App() {
  return (
    <BackgroundLayout>
      <SelectContentBtn />
    </BackgroundLayout>
  );
}

export default App;
