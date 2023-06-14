import React, { useContext, useEffect } from 'react';
import { Box, Button, Paper } from '@mui/material';
import ControlBar from '../components/ControlBar';
import MessageBox from './ChatBox';
import MessageInput from './MessageInput';
import { SocketProvider } from '../contexts/SocketContext';

const Main = ({ setJoined }) => {
    return (
        <>
            <Box sx={{ marginRight: 2 }}>
                <>
                    <ControlBar setJoined={setJoined} />
                </>
                <SocketProvider>
                    <>
                        <MessageBox />

                        <MessageInput />
                    </>
                </SocketProvider>
            </Box>
        </>
    );
};

export default Main;
