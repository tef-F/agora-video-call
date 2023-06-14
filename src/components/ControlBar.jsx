import React, { useContext, useEffect, useState } from 'react';
import {
    Box,
    Button,
    Paper,
    Container,
    IconButton,
    Grid,
    FormControl,
    InputLabel,
    Typography,
    Select,
    MenuItem,
    Tooltip,
    Fab,
    Menu,
} from '@mui/material';
import { JoinLeft } from '@mui/icons-material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Avatar from '@mui/material/Avatar';
import BlockIcon from '@mui/icons-material/Block';
import { useNavigate } from 'react-router-dom';
import { ClientContext } from '../ClientContext';
// import axios from 'axios';
const style = {
    button: {},
};
const settings = ['Account', 'Settings', 'Logout'];
const ControlBar = ({ setJoined }) => {
    const { uid, removeUserFromRoom, fullRoom } = useContext(ClientContext);

    // const navigate = useNavigate();
    const [idToCall, setIdToCall] = useState('');
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    console.log('setIdToCall', fullRoom);

    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };
    const authData = JSON.parse(localStorage.getItem('authData'));
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('authData');
        console.log('Logout >>');
        window.location.reload();
        navigate('/login', { replace: true });
    };

    const handleNextCall = () => {
        // handleDisconnect();
        setJoined(false);
        // removeUserFromRoom(uid);
    };
    const handleLeaveCall = () => {};

    return (
        <Box
            sx={{
                width: '100%',
                padding: 1,
                borderRadius: 5,
                backgroundColor: '#EDF1FB',
            }}
        >
            <Box
                sx={{
                    borderRadius: 5,
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: '10px',
                }}
            >
                <Box
                    sx={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        display: 'grid',
                        gridTemplateColumns: 'repeat(2, 1fr)',
                        height: 55,
                        width: '70%',
                    }}
                >
                    <Box sx={{ marginRight: 1 }}>
                        <Button
                            variant="outlined"
                            color="success"
                            sx={{
                                height: 55,
                                width: '100%',
                                borderRadius: 10,
                            }}
                            onClick={handleNextCall}
                            startIcon={
                                <Box
                                    sx={{
                                        marginRight: 1.5,
                                        backgroundColor: '#008000',
                                        width: '40px',
                                        height: '40px',
                                        borderRadius: '50%',
                                    }}
                                >
                                    <ArrowForwardIosIcon sx={{marginTop: 1, color: 'white'}} fontSize="small" />
                                </Box>
                            }
                        >
                            <Typography sx={{ width: '100px' }}>
                                Next
                            </Typography>
                        </Button>
                    </Box>
                    <Box>
                        <Button
                            variant="outlined"
                            color="error"
                            sx={{
                                height: 55,
                                width: '100%',
                                borderRadius: 10,
                            }}
                            onClick={() => setJoined(false)}
                            startIcon={
                                <Box
                                    sx={{
                                        marginRight: 1.5,
                                        backgroundColor: '#c90404',
                                        width: '40px',
                                        height: '40px',
                                        borderRadius: '50%',
                                    }}
                                >
                                    <BlockIcon sx={{marginTop: 1, color: 'white'}} fontSize="small" />
                                </Box>
                            }
                        >
                            <Typography sx={{ width: '110px' }}>
                                Stop
                            </Typography>
                        </Button>
                    </Box>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        height: 55,
                        width: '95%',
                    }}
                >
                    <FormControl
                        sx={{ minWidth: 100, width: '30%', marginRight: 1 }}
                    >
                        <Select
                            displayEmpty
                            inputProps={{ 'aria-label': 'Without label' }}
                            sx={{ width: '100%', borderRadius: 5 }}
                        >
                            <MenuItem value="">
                                <em>City</em>
                            </MenuItem>
                            <MenuItem value={10}>Ha Noi</MenuItem>
                            <MenuItem value={20}>Da Nang</MenuItem>
                            <MenuItem value={30}>Ho Chi Minh</MenuItem>
                        </Select>
                    </FormControl>
                    <Box>
                        <Tooltip title="Tan Tai">
                            <IconButton
                                onClick={handleOpenUserMenu}
                                sx={{ p: 0 }}
                            >
                                <Avatar
                                    alt="Tấn Tài"
                                    src={
                                        authData
                                            ? authData.data.linkAvt
                                            : 'https://i1.sndcdn.com/artworks-000189080723-ez2uad-t500x500.jpg'
                                    }
                                />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {/* {settings.map((setting) => (
                                <MenuItem
                                    key={setting}
                                    onClick={handleCloseUserMenu}
                                >
                                    <Typography textAlign="center">
                                        {setting}
                                    </Typography>
                                </MenuItem>
                            ))} */}
                            <MenuItem key={1} onClick={handleLogout}>
                                <Typography textAlign="center">
                                    Logout
                                </Typography>
                            </MenuItem>
                        </Menu>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default ControlBar;
