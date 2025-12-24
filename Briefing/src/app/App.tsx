import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from 'app/router/index.ts';
import { BackgroundScreen } from "widgets/BackgroundScreen";

function App() {
  return (
    <BrowserRouter>
      <BackgroundScreen>
        <AppRouter/>
      </BackgroundScreen>
    </BrowserRouter>
  )
}

export default App
