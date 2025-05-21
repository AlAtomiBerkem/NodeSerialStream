import { useState } from 'react';
import BackgroundScreen from './components/Slider';
import PhotoCapture from './components/PhotoCapture';

function App() {
    const [selectedBackground, setSelectedBackground] = useState(null);
    const [backgroundId, setBackgroundId] = useState(null);

    const handleBackgroundSelect = (url, id) => {
        setSelectedBackground(url);
        setBackgroundId(id);
    };

    return (
        <div className="app">
            {!selectedBackground ? (
                <BackgroundScreen
                    onSelect={(url, id) => handleBackgroundSelect(url, id)}
                />
            ) : (
                <PhotoCapture
                    backgroundId={backgroundId}
                    onBack={() => setSelectedBackground(null)}
                />
            )}
        </div>
    );
}

export default App;