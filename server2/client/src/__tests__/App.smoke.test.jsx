import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import App from '../App.jsx';
import { AppProviders } from '../app/providers.jsx';

describe('App', () => {
    it('renders without crashing', () => {
        const { container } = render(
            <AppProviders>
                <App />
            </AppProviders>
        );
        expect(container).toBeTruthy();
    });
});


