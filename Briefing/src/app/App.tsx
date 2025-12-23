import { AppRouter } from 'app/router/index.ts';
import { BackgroundScreen } from "widgets/BackgroundScreen";

function App() {

  return (
      <BackgroundScreen>
          <AppRouter/>
      </BackgroundScreen>
  )
}

export default App
