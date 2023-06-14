import React, { useContext, useState } from 'react';
import {
    Box,
    Button,
    Paper,
    Container,
    Grid,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    OutlinedInput,
    Typography,
    InputAdornment,
} from '@mui/material';
// import { NavigateNextIcon, CloseIcon, Phone } from '@mui/icons-material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import BlockIcon from '@mui/icons-material/Block';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import SendIcon from '@mui/icons-material/Send';
import { SocketContext } from '../contexts/SocketContext';
const style = {
    button: {},
};
const MessageInput = () => {
    const { handleSendClick, handleMessageChange, message } =
        useContext(SocketContext);

    return (
        <>
            <Box
                sx={{
                    marginTop: '10px',
                    width: '100%',
                    height: '100%',
                    padding: 1,
                    backgroundColor: '#EDF1FB',
                    borderRadius: 10,
                    paddingRight: 1,
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        height: '45px',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                       
                    }}
                >
                    <FormControl
                        sx={{ flexGrow: 1, marginRight: '10px' }}
                        variant="outlined"
                    >
                        <OutlinedInput
                            sx={{ borderRadius: 5 }}
                            size="small"
                            id="outlined-adornment-weight"
                            endAdornment={
                                <InputAdornment position="end">
                                    <InsertEmoticonIcon />
                                </InputAdornment>
                            }
                            value={message}
                            onChange={handleMessageChange}
                            aria-describedby="outlined-weight-helper-text"
                        />
                    </FormControl>

                    <Button
                        sx={{ borderRadius: 5,}}
                        variant="outlined"
                        color="info"
                        onClick={handleSendClick}
                        endIcon={<SendIcon fontSize="large" />}
                    >
                        <Typography sx={{ width: '110px' }}>Send</Typography>
                    </Button>
                </Box>
            </Box>
        </>
    );
};

export default MessageInput;
