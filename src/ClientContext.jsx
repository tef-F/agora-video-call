import { createContext, useEffect, useState, useRef } from 'react';
import AgoraRTC, { createClient } from 'agora-rtc-sdk-ng';

const ClientContext = createContext();
const APP_ID = '7db223eb737244e9abdc22226cf7e49c';
const TOKEN =
    '007eJxTYDix9fLrGb8Nu99p+ZxjkpBbEpDONEn8dY157gd/lei5uYwKDOYpSUZGxqlJ5sbmRiYmqZaJSSnJRkBglpxmnmpimfz2VmtKQyAjw5TCJhZGBggE8bkZihLzUvJzdZMTc3IYGAA3WiI4';

const CHANNEL = 'random-call';
const ContextProvider = ({ children }) => {
    AgoraRTC.setLogLevel(4);
    AgoraRTC.setArea({
        areaCode: 'GLOBAL',
        excludedArea: 'CHINA',
    });

    let agoraCommandQueue = Promise.resolve();
    let [rtc, setRtc] = useState({
        client: null,
        localAudioTrack: null,
        localVideoTrack: null,
    });

    const createAgoraClient = ({ onVideoTrack, onUserDisconnected }) => {
        rtc.client = createClient({
            mode: 'rtc',
            codec: 'vp8',
        });

        let trackVideo, trackAudio;

        const waitForConnectionState = (connectionState) => {
            return new Promise((resolve) => {
                const interval = setInterval(() => {
                    if (rtc.client.connectionState === connectionState) {
                        clearInterval(interval);
                        resolve();
                    }
                }, 200);
            });
        };

        const connect = async () => {
            await waitForConnectionState('DISCONNECTED');

            const uid = await rtc.client.join(APP_ID, CHANNEL, TOKEN, null);

            rtc.client.on('user-published', (user, mediaType) => {
                rtc.client.subscribe(user, mediaType).then(() => {
                    if (mediaType === 'video') {
                        onVideoTrack(user);
                    }
                    // if (mediaType === 'audio') {
                    //     user.audioTrack.play();
                    // }
                });
            });

            rtc.client.on('user-left', (user) => {
                onUserDisconnected(user);
            });

            rtc.localVideoTrack = await AgoraRTC.createCameraVideoTrack();
            rtc.localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();

            await rtc.client.publish([
                rtc.localVideoTrack,
                rtc.localVideoTrack,
            ]);
            return {
                rtc,
                uid,
            };
        };

        const disconnect = async () => {
            await waitForConnectionState('CONNECTED');
            rtc.client.removeAllListeners();
            // for (let track of tracks) {
            //     track.stop();
            //     track.close();
            // }
            rtc.localVideoTrack.stop();
            rtc.localVideoTrack.close();
            rtc.localAudioTrack.stop();
            rtc.localAudioTrack.close();
            await rtc.client.unpublish([
                rtc.localVideoTrack,
                rtc.localAudioTrack,
            ]);
            await rtc.client.leave();
            setRtc(null);
        };

        return {
            disconnect,
            connect,
        };
    };

    console.log(rtc);

    const stopAudio = async () => {
        console.log('Stop', rtc.localAudioTrack);
        rtc.localAudioTrack.close();
        await rtc.client.unpublish(rtc.localAudioTrack);
    };

    const startAudio = async () => {
        rtc.localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
        await rtc.client.publish(rtc.localAudioTrack);
    };

    const stopVideo = () => {
        rtc.localVideoTrack.close();
        rtc.client.unpublish(rtc.localVideoTrack);
    };
    const startVideo = async () => {
        // me.classList.add('connecting');
        rtc.localVideoTrack = await AgoraRTC.createCameraVideoTrack();
        rtc.client.publish(rtc.localVideoTrack);
        // rtc.localVideoTrack.play('me');
    };

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
            const { rtc, uid } = await connect();
            setUid(uid);
            localStorage.setItem('meId', uid);
            setUsers((previousUsers) => [
                ...previousUsers,
                {
                    uid,
                    audioTrack: rtc.localAudioTrack,
                    videoTrack: rtc.localVideoTrack,
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
        <ClientContext.Provider
            value={{
                users,
                createAgoraClient,
                stopAudio,
                startAudio,
                stopVideo,
                startVideo,
            }}
        >
            {children}
        </ClientContext.Provider>
    );
};

export { ContextProvider, ClientContext };
