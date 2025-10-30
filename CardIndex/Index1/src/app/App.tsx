import './styles/index.css'
import { AppRouter } from 'app/router/index.ts';
import {BackgroundScreen} from "widgets/BackgroundScreen";

function App() {

  return (
      <BackgroundScreen>
          <div className='app'>
              <AppRouter/>
              
          </div>
      </BackgroundScreen>
  )
}

export default App
