import React, { useContext, useEffect, useState } from 'react';
// import AgoraRTC, { createClient } from 'agora-rtc-sdk-ng';
import { VideoPlayer } from './VideoPlayer';
import { Box, Grid, Button, Typography, Paper, colors } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

import NavBar from '../components/NavBar';
import { ClientContext } from '../ClientContext';
import Main from './Main';

export const VideoRoom = ({ setJoined }) => {
    var { users } = useContext(ClientContext);
    var [wait, setWait] = useState(true);
    var change = async() => {
        var length = await Object.keys(users).length;
        if (length === 1) {
            setWait(true);
        } else {
            setWait(false);
        }
    } 
    change();
    return (
        <Box>
            <NavBar />
            <Grid container spacing={2}>
                <Grid item xs={3.2}>
                    <Box
                        sx={{
                            marginLeft: '10px',
                            display: 'grid',
                            gridTemplateRows: 'repeat(2, 1fr)',
                        }}
                    >
                        {users.map((user, index, userOld) => {
                            return (
                                <VideoPlayer
                                    key={index}
                                    user={user}
                                    otherUsers={userOld}
                                />
                            );
                        })}
                        {wait ? (
                            <Paper
                                sx={{
                                    backgroundColor: 'black',
                                    width: 400,
                                    height: 280,
                                    borderRadius: 2,
                                    justifyContent: 'center',
                                    display: 'grid',
                                    alignItems: 'center',
                                    gridTemplateRows: 'repeat(2, 1fr)',
                                }}
                            >
                                <Box
                                    sx={{
                                        paddingTop: 13,
                                        // paddingBottom: 10,
                                        // paddingLeft: 22,
                                        alignContent: 'center',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Box>
                                        <CircularProgress sx={{color: 'white'}} />
                                        <Typography color={'white'}>
                                            Waiting . . .
                                        </Typography>
                                    </Box>
                                </Box>
                            </Paper>
                        ) : (
                            <> </>
                        )}
                    </Box>
                </Grid>
                <Grid item xs={8.8}>
                    <>
                        <Main setJoined={setJoined} />
                    </>
                </Grid>
            </Grid>
        </Box>
    );
};
