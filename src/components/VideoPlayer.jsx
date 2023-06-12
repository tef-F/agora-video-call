import React, { useEffect, useState, useRef } from 'react';
import {
    Typography,
    Paper,
    Box,
    Button,
    Card,
    IconButton,
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import SettingsIcon from '@mui/icons-material/Settings';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import VideocamIcon from '@mui/icons-material/Videocam';

import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Switch from '@mui/material/Switch';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import { truncate } from 'lodash';

export const VideoPlayer = ({ user }) => {
    var [toggleVideo, setToggleVideo] = useState(true);
    var [checkUser, setCheckUser] = useState(true);
    var [toggleMic, setToggleMic] = useState(true);
    const ref = useRef();
    const hideVideo = () => {
        if (stream) {
            setToggleVideo(!toggleVideo);
            // stream.getVideoTracks()[0].enabled = !toggleVideo;
        }
    };
    const muteMic = () => {
        if (stream) {
            setToggleMic(!toggleMic);
            // stream.getAudioTracks()[0].enabled = !toggleMic;
        }
    };

    const [open, setOpen] = React.useState(false);
    const [fullWidth, setFullWidth] = React.useState(true);
    const [maxWidth, setMaxWidth] = React.useState('sm');

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleMaxWidthChange = (event) => {
        setMaxWidth(
            // @ts-expect-error autofill of arbitrary value is not handled.
            event.target.value,
        );
    };
    const meRef = useRef();
    const userRef = useRef();

    useEffect(() => {
      user.videoTrack.play(meRef.current);
      user.audioTrack.play();
    }, []);
    // <div>
    //     Uid: {user.uid}
    //     <div ref={ref} style={{ width: '200px', height: '200px' }}></div>
    // </div>

    return (
        <Paper
            sx={{
                backgroundColor: 'black',
                marginTop: 2,
                width: 400,
                height: 280,
                borderRadius: 2,
            }}
        >
            <Card
                sx={{
                    borderRadius: 2,
                    backgroundColor: '#3E4C5D',
                }}
                variant="outlined"
            >
                <Box
                    sx={{
                        zIndex: 1,
                        position: 'absolute',
                    }}
                >
                    <Paper
                        style={{
                            marginTop: 5,
                            width: 400,
                            height: 270,
                        }}
                        ref={meRef}
                    />
                    <Typography sx={{ marginLeft: 2 }} color={'white'} mb={1}>
                        {user.uid || 'Van Trieu'}
                    </Typography>
                </Box>
                {!toggleVideo ? (
                    <Box
                        sx={{
                            position: 'absolute',
                            zIndex: 2,
                            paddingTop: 16,
                            paddingBottom: 10,
                            paddingLeft: 15,
                            paddingRight: 12,
                        }}
                    >
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={hideVideo}
                            fullWidth
                            startIcon={
                                <PlayCircleOutlineIcon fontSize="large" />
                            }
                        >
                            Start Cam
                        </Button>
                    </Box>
                ) : (
                    <></>
                )}
            </Card>
        </Paper>
    );
};
