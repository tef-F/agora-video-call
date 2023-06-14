import React, { useContext } from 'react';
import { Box, Button, Paper, List, ListItem } from '@mui/material';
import ControlBar from './ControlBar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import moment from 'moment';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/Inbox';

import { SocketContext } from '../contexts/SocketContext';
const MessageBox = () => {
    const { messages, name, me } = useContext(SocketContext);
    const authData = JSON.parse(localStorage.getItem('authData'));
    
    const _id = authData.data._id || 1;
    return (
        <>
            <Box
                sx={{
                    marginTop: '10px',
                    height: '470px',
                    width: '100%',
                    maxHeight: '470px',
                    overflow: 'auto',
                    backgroundColor: '#EDF1FB',
                    borderRadius: 5,
                }}
            >
                <Box sx={{ margin: 2, marginBottom: 1,paddingLeft: '450px' ,justifyContent: 'center' }}>
                    <Typography  fontWeight="bold" color='black' fontSize={15}>
                        Connect Chat with stranger people
                    </Typography>
                </Box>
                <List
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        paddingRight: 1,
                        gap: 2,
                    }}
                >
                    {messages.map((msg, index) => (
                        <Box
                            key={index}
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                maxWidth: '100%',
                                padding: 1,
                                borderRadius: '5px',
                            }}
                        >
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    flexDirection:
                                        msg.id !== _id ? 'row' : 'row-reverse',
                                }}
                            >
                                <Avatar
                                    sx={{
                                        marginBottom: 3,
                                        marginRight: msg.id !== _id ? 1 : 0,
                                        marginLeft: msg.id !== _id ? 0 : 1,
                                    }}
                                    alt={msg.id !== _id ? 'Triều' : 'TanTei'}
                                    src={
                                        msg.id !== _id
                                            ? msg.linkAvt
                                            : authData.data.linkAvt
                                    }
                                />
                                <Box>
                                    <Box
                                        sx={{
                                            background: `linear-gradient(40deg, rgba(235, 189, 27, 0.48) 0%, rgb(245, 144, 25) 100%)`,
                                            padding: 2,
                                            borderRadius: 5,
                                        }}
                                    >
                                        <Typography>{msg.message}</Typography>
                                    </Box>
                                    <Box
                                        sx={{
                                            justifyContent: 'flex-start',
                                            width: '100%',
                                            alignItems: 'self-end',
                                            // backgroundColor: 'red',
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                fontSize: 10,
                                            }}
                                        >
                                            {moment(msg.time).fromNow()}
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    ))}
                </List>
            </Box>
        </>
    );
};

export default MessageBox;
