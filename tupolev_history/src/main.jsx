import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './store/store.js';

import App from './App.jsx';
import './styles/fonts.css';

const rootElement = document.getElementById('root');

const root = createRoot(rootElement);

window.addEventListener('touchmove', function(e) {
  let el = e.target;
  let allowVerticalScroll = false;
  while (el) {
    if (el.classList && el.classList.contains('card-content')) {
      if (e.touches && e.touches.length === 1) {
        const touch = e.touches[0];
        const lastY = el._lastTouchY !== undefined ? el._lastTouchY : touch.clientY;
        const lastX = el._lastTouchX !== undefined ? el._lastTouchX : touch.clientX;
        const deltaY = Math.abs(touch.clientY - lastY);
        const deltaX = Math.abs(touch.clientX - lastX);
        el._lastTouchY = touch.clientY;
        el._lastTouchX = touch.clientX;
        if (deltaY >= deltaX) {
          allowVerticalScroll = true;
        }
      }
      break;
    }
    el = el.parentElement;
  }
  if (!allowVerticalScroll) {
    e.preventDefault();
  }
}, { passive: false });

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
