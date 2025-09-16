import { useSelector } from 'react-redux';

export function ConnectionStatus() {
    const { connected, idTab, registered, readiness } = useSelector((s) => s.device);
    return (
        <div style={{ position: 'fixed', bottom: 12, right: 12, padding: '8px 12px', borderRadius: 8, background: '#0b1220', color: '#fff', fontFamily: 'sans-serif', fontSize: 12, opacity: 0.9 }}>
            <div>WS: {connected ? 'online' : 'offline'}</div>
            <div>idTab: {idTab || '—'}</div>
            <div>registered: {registered === null ? '—' : String(registered)}</div>
            <div>readiness: {readiness ? String(readiness.ready) : '—'}</div>
        </div>
    );
}


