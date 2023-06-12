import React, { useEffect, useState } from 'react';
import AgoraRTC, { createClient } from 'agora-rtc-sdk-ng';
import { VideoPlayer } from './VideoPlayer';
import { AppBar, Box, Typography, Grid } from '@mui/material';
import NavBar from '../components/NavBar';

const APP_ID = '7db223eb737244e9abdc22226cf7e49c';
const TOKEN =
    '007eJxTYDix9fLrGb8Nu99p+ZxjkpBbEpDONEn8dY157gd/lei5uYwKDOYpSUZGxqlJ5sbmRiYmqZaJSSnJRkBglpxmnmpimfz2VmtKQyAjw5TCJhZGBggE8bkZihLzUvJzdZMTc3IYGAA3WiI4';

const CHANNEL = 'random-call';

AgoraRTC.setLogLevel(4);
AgoraRTC.setArea({
  areaCode:"GLOBAL",
  excludedArea:"CHINA"
})

let agoraCommandQueue = Promise.resolve();

const createAgoraClient = ({ onVideoTrack, onUserDisconnected }) => {
    const client = createClient({
        mode: 'rtc',
        codec: 'vp8',
    });

    let trackVideo, tracksMic;

    const waitForConnectionState = (connectionState) => {
        return new Promise((resolve) => {
            const interval = setInterval(() => {
                if (client.connectionState === connectionState) {
                    clearInterval(interval);
                    resolve();
                }
            }, 200);
        });
    };

    const connect = async () => {
        await waitForConnectionState('DISCONNECTED');

        const uid = await client.join(APP_ID, CHANNEL, TOKEN, null);

        client.on('user-published', (user, mediaType) => {
            client.subscribe(user, mediaType).then(() => {
                if (mediaType === 'video') {
                    onVideoTrack(user);
                }
            });
        });

        client.on('user-left', (user) => {
            onUserDisconnected(user);
        });

        trackVideo = await AgoraRTC.createCameraVideoTrack();
        tracksMic = await AgoraRTC.createMicrophoneAudioTrack();

        await client.publish(trackVideo);
        await client.publish(tracksMic);

        return {
            trackVideo,
            tracksMic,
            uid,
        };
    };

    const disconnect = async () => {
        await waitForConnectionState('CONNECTED');
        client.removeAllListeners();
        // for (let track of tracks) {
        //     track.stop();
        //     track.close();
        // }
        trackVideo.stop();
        trackVideo.close();
        tracksMic.stop();
        tracksMic.close();
        await client.unpublish(trackVideo);
        await client.unpublish(tracksMic);
        await client.leave();
    };

    return {
        disconnect,
        connect,
    };
};

export const VideoRoom = () => {
    const [users, setUsers] = useState([]);
    const [uid, setUid] = useState(null);

    useEffect(() => {
        const onVideoTrack = (user) => {
            setUsers((previousUsers) => [...previousUsers, user]);
        };

        const onUserDisconnected = (user) => {
            setUsers((previousUsers) =>
                previousUsers.filter((u) => u.uid !== user.uid),
            );
        };

        const { connect, disconnect } = createAgoraClient({
            onVideoTrack,
            onUserDisconnected,
        });

        const setup = async () => {
            const { trackVideo, tracksMic, uid } = await connect();
            setUid(uid);
            setUsers((previousUsers) => [
                ...previousUsers,
                {
                    uid,
                    audioTrack: tracksMic,
                    videoTrack: trackVideo,
                },
            ]);
        };

        const cleanup = async () => {
            await disconnect();
            setUid(null);
            setUsers([]);
        };

        // setup();
        agoraCommandQueue = agoraCommandQueue.then(setup);

        return () => {
            // cleanup();
            agoraCommandQueue = agoraCommandQueue.then(cleanup);
        };
    }, []);

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
                    {users.map((user) => (
                        <VideoPlayer key={user.uid} user={user} />
                    ))}
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
