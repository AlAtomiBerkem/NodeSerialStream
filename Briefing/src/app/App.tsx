import { BrowserRouter, useNavigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { AppRouter } from 'app/router/index.ts';
import { BackgroundScreen } from "widgets/BackgroundScreen";
import { store } from 'app/provider/store/store';
import { useIdleTimer } from 'shared/lib/useIdleTimer/useIdleTimer';

const AppContent = () => {
  const navigate = useNavigate();

  useIdleTimer(() => {
    // Возвращаем на главную страницу при бездействии
    navigate('/');
  }, 120000); // 2 минуты

  return (
    <BackgroundScreen>
      <AppRouter />
    </BackgroundScreen>
  );
};

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </Provider>
  )
}

export default App
