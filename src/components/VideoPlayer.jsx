import React, { useEffect, useState, useRef, useContext } from 'react';
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
import { ClientContext } from '../ClientContext';

export const VideoPlayer = ({ user, otherUsers}) => {
    var { uid, users, rtc } = useContext(ClientContext);
    var [toggleVideo, setToggleVideo] = useState(true);
    var [checkUser, setCheckUser] = useState(true);
    var [toggleMic, setToggleMic] = useState(true);
    const hideVideo = () => {
        setToggleVideo(!toggleVideo);
        user.videoTrack.setEnabled(!toggleVideo);
    };
    const muteMic = () => {
        setToggleMic(!toggleMic);
        user.audioTrack.setEnabled(!toggleMic);
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
    const [nameTitle, setNameTitle] = useState('');
    const userRef = useRef();
    const meId = localStorage.getItem('meId');
    // console.log('Me', meId);
    // console.log('User', user.uid);
    // console.log('other User', otherUsers.uid);
    // useEffect(() => {
    //     if (meId !== user.uid) {
    //         setNameTitle(`User (${user.uid})`);
    //     } else {
    //         setNameTitle(`Me (${meId})`);
    //     }
    // }, [user]);
    const uidMe = localStorage.getItem('meId');
    console.log('Local: ', uidMe);
    useEffect(() => {
        const playVideo = () => {
            if (user.videoTrack) {
                user.videoTrack.play(meRef.current);
            }
        };
        playVideo();
    }, [user.videoTrack]);
    useEffect(() => {
        if (user.audioTrack) {
            user.audioTrack.play();
        }
    }, [user.audioTrack]);

    return (
        <>
            <Paper
                sx={{
                    backgroundColor: 'black',
                    width: 400,
                    height: 280,
                    borderRadius: 2,
                    marginBottom:8,
                    display: 'grid',
                    gridTemplateRows: 'repeat(2, 1fr)',
                }}
            >
                <Card
                    sx={{
                      
                        borderRadius: 2,
                        backgroundColor: '#EDF1FB',
                    }}
                    variant="outlined"
                >
                    <Box
                        sx={{
                            position: 'absolute',
                        }}
                    >
                        <Box>

                        <Paper
                            style={{
                                margin: 5,
                                width: "95%",
                                height: 270,
                            }}
                            ref={meRef}
                        />
                        </Box>
                        <Box
                            sx={{
                                width: 400,
                                marginTop: 2.5,
                                backgroundColor: '#EDF1FB',
                                height: 40,
                                borderRadius: 5,
                            }}
                        >
                            <Grid
                                sx={{
                                    // paddingTop: 1,
                                    paddingRight: 2,
                                    justifyContent: 'right',
                                }}
                                container
                                spacing={3}
                                direction={'row'}
                            >
                                <Typography
                                    sx={{ marginRight: 15, marginTop: 1 }}
                                    color={'white'}
                                >
                                    {nameTitle}
                                </Typography>
                                <IconButton
                                    onClick={hideVideo}
                                    color="primary"
                                    children={
                                        toggleVideo ? (
                                            <VideocamIcon />
                                        ) : (
                                            <VideocamOffIcon />
                                        )
                                    }
                                ></IconButton>
                                <IconButton
                                    onClick={muteMic}
                                    color="primary"
                                    children={
                                        toggleMic ? <MicIcon /> : <MicOffIcon />
                                    }
                                ></IconButton>
                                <IconButton
                                    onClick={handleClickOpen}
                                    color="primary"
                                    children={<SettingsIcon />}
                                ></IconButton>
                            </Grid>
                        </Box>
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

                <Dialog
                    fullWidth={fullWidth}
                    maxWidth={maxWidth}
                    open={open}
                    onClose={handleClose}
                >
                    <DialogTitle>Setting</DialogTitle>
                    <DialogContent>
                        {/* <DialogContentText>
                            You can set my maximum width and whether to adapt or
                            not.
                        </DialogContentText> */}
                        <Box
                            noValidate
                            component="form"
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                m: 'auto',
                                width: 'fit-content',
                            }}
                        >
                            <FormControl sx={{ mt: 2, minWidth: 250 }}>
                                <InputLabel htmlFor="max-width">
                                    Micro
                                </InputLabel>
                                <Select
                                    autoFocus
                                    value={maxWidth}
                                    onChange={handleMaxWidthChange}
                                    label="maxWidth"
                                    inputProps={{
                                        name: 'max-width',
                                        id: 'max-width',
                                    }}
                                >
                                    <MenuItem value={false}></MenuItem>
                                    <MenuItem value="xs">
                                        Default - Microphone Array (Realtek
                                        Audio)
                                    </MenuItem>
                                    <MenuItem value="sm">sm</MenuItem>
                                    <MenuItem value="md">md</MenuItem>
                                    <MenuItem value="lg">lg</MenuItem>
                                    <MenuItem value="xl">xl</MenuItem>
                                </Select>
                            </FormControl>
                            {/* <FormControlLabel
                                sx={{ mt: 1 }}
                                control={
                                    <Switch
                                        checked={fullWidth}
                                        onChange={handleFullWidthChange}
                                    />
                                }
                                label="Full width"
                            /> */}
                        </Box>
                        <Box>
                            <FormControlLabel
                                value="start"
                                control={<Switch color="primary" />}
                                label="Hide Your Location"
                                labelPlacement="start"
                            />
                            <hr />
                            <FormControlLabel
                                value="start"
                                control={<Switch color="primary" />}
                                label="Intro message                            "
                                labelPlacement="start"
                            />
                            <hr />
                            <FormControlLabel
                                value="start"
                                control={<Switch color="primary" />}
                                label="Show likes count"
                                labelPlacement="start"
                            />
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Close</Button>
                    </DialogActions>
                </Dialog>
            </Paper>
        </>
    );
};
