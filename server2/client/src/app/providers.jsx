import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { store } from '../store/store.js';

export function AppProviders({ children }) {
    return (
        <Provider store={store}>
            <Router>{children}</Router>
        </Provider>
    );
}


