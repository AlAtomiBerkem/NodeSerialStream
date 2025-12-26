import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { AppRouter } from 'app/router/index.ts';
import { BackgroundScreen } from "widgets/BackgroundScreen";
import { store } from 'app/provider/store/store';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <BackgroundScreen>
          <AppRouter/>
        </BackgroundScreen>
      </BrowserRouter>
    </Provider>
  )
}

export default App
