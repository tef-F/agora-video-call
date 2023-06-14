import { useState, useRef, useContext } from 'react';
import { VideoRoom } from '../components/VideoRoom';
import { ContextProvider } from '../ClientContext';
import Container from '@mui/material/Container';
import { Box, Button, Avatar, Typography } from '@mui/material';
import InputIcon from '@mui/icons-material/Input';
import OutputIcon from '@mui/icons-material/Output';
function HomeScreen() {
    const [joined, setJoined] = useState(false);
    var linkAvt = '';
    const authData = JSON.parse(localStorage.getItem('authData'));
    if (authData) {
        linkAvt = authData.data.linkAvt;
    }
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('authData');
        console.log('Logout >>');
        window.location.reload();
        navigate('/login', { replace: true });
    };


    return (
        <>
            {!joined && (
                <Container
                    sx={{ alignItems: 'center' }}
                    component="main"
                    maxWidth="xs"
                >
                    <Box
                        sx={{
                            marginTop: 8,
                            padding: 5,
                            background: `linear-gradient(to right, rgb(252, 74, 26), rgb(247, 183, 51))`,
                            display: 'flex',
                            height: '400px',
                            flexDirection: 'column',
                            alignItems: 'center',
                            borderRadius: 5,
                        }}
                    >
                        <Avatar
                            alt="Remy Sharp"
                            src={
                                linkAvt
                                    ? linkAvt
                                    : 'https://i1.sndcdn.com/artworks-000189080723-ez2uad-t500x500.jpg'
                            }
                            sx={{ width: 80, height: 80 }}
                        />
                        <Typography component="h1" variant="h4" color={'white'}>
                            {authData ? authData.data.username : 'Unknown'}
                        </Typography>
                        <Typography
                            sx={{ marginTop: '30px', marginBottom: '50px' }}
                            component="h1"
                            variant="h6"
                            color={'white'}
                        >
                            Welcome to the secret video chat app Here you can
                            meet strangers <br></br> from all over!!!
                        </Typography>
                        <Button
                            sx={{ height: '60px',width: '200px',  borderRadius: 5 }}
                            variant="contained"
                            color="warning"
                            onClick={() => setJoined(true)}
                            endIcon={<InputIcon />}
                        >
                            Join Room
                        </Button>
                        <Button
                            sx={{ height: '60px', width: '200px', marginTop: 1, borderRadius: 5 }}
                            variant="outlined"
                            color="error"
                            onClick={handleLogout}
                            endIcon={<OutputIcon />}
                        >
                            Logout
                        </Button>
                    </Box>
                </Container>
            )}

            {joined && (
                <ContextProvider>
                    <VideoRoom setJoined={setJoined} />
                </ContextProvider>
            )}
        </>
    );
}

export default HomeScreen;
