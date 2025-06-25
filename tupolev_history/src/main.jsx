import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './store/store.js';

import App from './App.jsx';
import './styles/fonts.css';

const rootElement = document.getElementById('root');

const root = createRoot(rootElement);

// Блокировка bounce-эффекта на всех touch-устройствах
window.addEventListener('touchmove', function(e) {
  e.preventDefault();
}, { passive: false });

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
