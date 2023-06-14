import { useState, useRef, useContext } from 'react';
import './App.css';
import { VideoRoom } from './components/VideoRoom';
import { ContextProvider } from './ClientContext';
import { BrowserRouter } from 'react-router-dom';

import RootRoutes from './routing/Routes';
import HomeScreen from './screens/HomeScreen';
function App() {

    return (
        <BrowserRouter>
            {/* <main> */}
            <RootRoutes />
            {/* </main> */}
            {/* <HomeScreen/> */}
        </BrowserRouter>
    );
}

export default App;
