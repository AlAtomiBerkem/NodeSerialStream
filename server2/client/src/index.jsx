import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { AppProviders } from './app/providers.jsx';
import { WSBootstrap } from './processes/session-bootstrap/wsBootstrap.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <AppProviders>
        <WSBootstrap>
            <App />
        </WSBootstrap>
    </AppProviders>
);
