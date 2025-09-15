import { useEffect } from 'react';
import { WSClient } from '../../services/ws/index.js';
import { useDispatch } from 'react-redux';
import { wsConnected, wsDisconnected, setIdTab, setRegistered } from '../../entities/device/deviceSlice.js';

export function WSBootstrap({ children }) {
    const dispatch = useDispatch();

    useEffect(() => {
        const client = new WSClient();
        const offOpen = client.on('open', () => dispatch(wsConnected()));
        const offClose = client.on('close', () => dispatch(wsDisconnected()));
        const offMsg = client.on('message', (msg) => {
            if (msg && typeof msg === 'object') {
                if (msg.type === 'device/idTab' && msg.idTab) dispatch(setIdTab(msg.idTab));
                if (msg.type === 'device/registered' && 'registered' in msg) dispatch(setRegistered(msg.registered));
            }
        });
        client.connect();
        return () => { offOpen(); offClose(); offMsg(); };
    }, [dispatch]);

    return children;
}


