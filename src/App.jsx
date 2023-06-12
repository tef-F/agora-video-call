import { useState, useRef, useContext } from 'react';
import './App.css';
import { VideoRoom } from './components/VideoRoom';
import { ContextProvider } from './ClientContext';

function App() {
    const [joined, setJoined] = useState(false);
    const handleJoined = () => {
      setJoined(false);
      window.location.reload();
    }

    return (
        <ContextProvider>
            <div className="App">
                <h1>WDJ Virtual Call</h1>

                {!joined && (
                    <button onClick={() => setJoined(true)}>Login</button>
                )}

                {joined && (
                    <>
                        <button onClick={handleJoined}>
                            To Lobby
                        </button>
                        <VideoRoom />
                    </>
                )}
            </div>
        </ContextProvider>
    );
}

export default App;
