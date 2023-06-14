import { createContext, useEffect, useState, useRef } from 'react';
import AgoraRTC, { createClient } from 'agora-rtc-sdk-ng';

const ClientContext = createContext();
const APP_ID = '7db223eb737244e9abdc22226cf7e49c';
const TOKEN =
    '007eJxTYGDVvC/d7COY8m/hX0lu6SBX6wT7K3dKtaLmHPQpTp59978Cg3lKkpGRcWqSubG5kYlJqmViUkqyERCYJaeZp5pYJpsadqY0BDIyvGnrYWVkgEAQn5uhKDEvJT9XNzkxJ4eBAQCpfiDc';

const CHANNEL = 'random-call';
const ContextProvider = ({ children }) => {
    const [fullRoom, setFullRoom] = useState(false);
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

    const createAgoraClient = ({
        onVideoTrack,
        onUserDisconnected,
        onUserVideoUnpublished,
    }) => {
        rtc.client = createClient({
            mode: 'rtc',
            codec: 'vp8',
        });

        const waitForConnectionState = (connectionState) => {
            return new Promise((resolve) => {
                const interval = setInterval(() => {
                    if (rtc.client.connectionState === connectionState) {
                        clearInterval(interval);
                        resolve();
                    }
                }, 300);
            });
        };

        const connect = async () => {
            await waitForConnectionState('DISCONNECTED');

            const uid = await rtc.client.join(APP_ID, CHANNEL, TOKEN, null);
            setUid(uid);
            localStorage.setItem('meId', uid);
            rtc.client.on('user-published', (user, mediaType) => {
                if (rtc.client._users.length > 2) {
                    setFullRoom(true);
                    rtc.client.leave();
                    // } else if(rtc.client._users.length  = 1) {
                    //     rtc.client.subscribe(user, mediaType).then(() => {
                    //         if (mediaType === 'video') {
                    //             onVideoTrack(user);
                    //         }
                    //         if (mediaType === 'audio') {
                    //             user.audioTrack.play();
                    //         }
                    //     });
                } else {
                    setFullRoom(false);
                    rtc.client.subscribe(user, mediaType).then(() => {
                        if (mediaType === 'video') {
                            onVideoTrack(user);
                        }
                        if (mediaType === 'audio') {
                            user.audioTrack.play();
                        }
                    });
                }
            });

            // rtc.client.on('user-unpublished', (user, mediaType) => {
            //     if (mediaType === 'video') {
            //         onUserVideoUnpublished(user);
            //     }
            // });

            rtc.client.on('user-left', (user) => {
                onUserDisconnected(user);
            });
            await AgoraRTC.createMicrophoneAndCameraTracks();
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
            rtc.localVideoTrack.stop();
            rtc.localVideoTrack.close();
            rtc.localAudioTrack.stop();
            rtc.localAudioTrack.close();
            await rtc.client.unpublish([
                rtc.localVideoTrack,
                rtc.localAudioTrack,
            ]);
            setFullRoom(false);
            await rtc.client.leave();
            setRtc(null);
        };

        return {
            disconnect,
            connect,
        };
    };
    const removeUserFromRoom = (uid) => {
        setUsers((prevUsers) => {
            prevUsers.map((u) => {
                if (u.uid === uid) {
                    return {
                        ...u,
                        videoTrack: null,
                        audioTrack: null, // Đặt videoTrack của người dùng là null để hiển thị màn hình trống
                    };
                }
            });
            return prevUsers.filter((u) => u.uid !== uid);
        });
    };

    // console.log(rtc);
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
            // user.videoTrack.close();
            // user.audioTrack.close();
        };

        const onUserVideoUnpublished = (user) => {
            setUsers((previousUsers) =>
                previousUsers.map((u) => {
                    if (u.uid === user.uid) {
                        return {
                            ...u,
                            videoTrack: null,
                            audioTrack: null, // Đặt videoTrack của người dùng là null để hiển thị màn hình trống
                        };
                    }
                    return u;
                }),
            );
        };

        const { connect, disconnect } = createAgoraClient({
            onVideoTrack,
            onUserDisconnected,
            onUserVideoUnpublished,
        });

        const setup = async () => {
            const { rtc, uid } = await connect();
            setUid(uid);
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
            localStorage.setItem('meId', '');
            await disconnect();
            setFullRoom(false);
            // setUid(null);
            // setUsers([]);
        };

        // setup();
        agoraCommandQueue = agoraCommandQueue.then(setup);

        return () => {
            // cleanup();
            agoraCommandQueue = agoraCommandQueue.then(cleanup);
        };
    }, []);

    const handleDisconnect = async () => {
        rtc.client.leave();
        rtc.client.removeAllListeners();
        rtc.localVideoTrack.stop();
        rtc.localVideoTrack.close();
        rtc.localAudioTrack.stop();
        rtc.localAudioTrack.close();
        await rtc.client.unpublish([rtc.localVideoTrack, rtc.localAudioTrack]);
        await rtc.client.leave();
        setRtc({
            client: null,
            localAudioTrack: null,
            localVideoTrack: null,
        });
    };

    // console.log(" A", remoteVideoTracks);
    // console.log(" B", myVideoTrack);
    console.log('uid - context', uid);
    
    return (
        <ClientContext.Provider
            value={{
                uid,
                users,
                createAgoraClient,
                handleDisconnect,
                fullRoom,
                removeUserFromRoom,
            }}
        >
            {children}
        </ClientContext.Provider>
    );
};

export { ContextProvider, ClientContext };
