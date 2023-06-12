import React, { useContext, useEffect, useState } from 'react';
// import AgoraRTC, { createClient } from 'agora-rtc-sdk-ng';
import { VideoPlayer } from './VideoPlayer';
import { Box, Grid, Button } from '@mui/material';
import NavBar from '../components/NavBar';
import { ClientContext } from '../ClientContext';

export const VideoRoom = () => {
    var { users } = useContext(ClientContext);
    return (
        // <>
        //   {uid}
        //   <div
        //     style={{
        //       display: 'flex',
        //       justifyContent: 'center',
        //     }}
        //   >
        //     <div
        //       style={{
        //         display: 'grid',
        //         gridTemplateColumns: 'repeat(2, 200px)',
        //       }}
        //     >
        //       {users.map((user) => (
        //         <VideoPlayer key={user.uid} user={user} />
        //       ))}
        //     </div>
        //   </div>
        // </>
        <Box>
            <NavBar />
            <Grid container spacing={2}>
                <Grid item xs={3.2}>
                    <Box
                        sx={{
                            marginTop: '75px',
                            marginLeft: '10px',
                            display: 'grid',
                            gridTemplateRows: 'repeat(2, 1fr)',
                        }}
                    >
                        {users.map((user) => (
                            <VideoPlayer key={user.uid} user={user} />
                        ))}
                    </Box>
                </Grid>
                <Grid item xs={8.8}>
                    <>
                        {/* <Options>
                            <Notifications />
                        </Options> */}
                        {/* <Main /> */}
                    </>
                </Grid>
            </Grid>
        </Box>
    );
};
