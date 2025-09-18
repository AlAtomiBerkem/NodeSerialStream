import { useEffect } from 'react';
import { WSClient } from '../../services/ws/index.js';
import { WSClientMock } from '../../services/ws/mock.js';
import { WS_MOCK } from '../../shared/config/env.js';
import { useDispatch } from 'react-redux';
import { wsConnected, wsDisconnected, setIdTab, setRegistered, setReadiness, setOverall, setComConnected } from '../../entities/device/deviceSlice.js';

export function WSBootstrap({ children }) {
    const dispatch = useDispatch();

    useEffect(() => {
        const client = WS_MOCK ? new WSClientMock() : new WSClient();
        const offOpen = client.on('open', () => dispatch(wsConnected()));
        const offClose = client.on('close', () => dispatch(wsDisconnected()));
        const offMsg = client.on('message', (msg) => {
            if (msg && typeof msg === 'object') {
                if (msg.type === 'device/idTab' && msg.idTab) dispatch(setIdTab(msg.idTab));
                if (msg.type === 'device/registered' && 'registered' in msg) dispatch(setRegistered(msg.registered));
                if (msg.type === 'device/readiness' && msg.readiness) dispatch(setReadiness(msg.readiness));
                if (msg.type === 'device/overall' && msg.overall) dispatch(setOverall(msg.overall));
                if (msg.type === 'device/com' && 'connected' in msg) dispatch(setComConnected(!!msg.connected));
            }
        });
        client.connect();
        return () => { offOpen(); offClose(); offMsg(); };
    }, [dispatch]);

    return children;
}



