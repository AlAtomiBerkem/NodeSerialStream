import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

export function RouteSync({ children }) {
    const navigate = useNavigate();
    const location = useLocation();
    const { idTab, registered, readiness, tagPlaced, test } = useSelector((s) => s.device);

    useEffect(() => {
        if (tagPlaced === false) {
            if (location.pathname !== '/error') navigate('/error', { replace: true });
            return;
        }
        if (idTab === null) {
            if (location.pathname !== '/') navigate('/', { replace: true });
            return;
        }
        if (registered === true && readiness && readiness.ready === true) {
            if (test && test.passed) {
                if (location.pathname !== '/testing-done') navigate('/testing-done', { replace: true });
            } else {
                if (location.pathname !== '/testing-start') navigate('/testing-start', { replace: true });
            }
            return;
        }
        if ((location.pathname === '/testing-done' || location.pathname === '/testing-start') && !(registered === true && readiness && readiness.ready === true)) {
            navigate('/', { replace: true });
        }
    }, [idTab, registered, readiness, tagPlaced, location.pathname, navigate]);

    return children;
}


