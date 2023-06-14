// import React, {useContext } from 'react';
// import axios from 'axios';
// import { useNavigate  } from 'react-router-dom';
// import { ClientContext } from '../ClientContext';

// const LoginScreen = (props) => {
//     const emailRef = React.createRef();
//     const passwordRef = React.createRef();
//     const navigate = useNavigate();
//     const REACT_APP_BASE_URL= 'http://localhost:5000';

//     const loginUser = (e) => {
//         e.preventDefault();
//         const email = emailRef.current.value;
//         const password = passwordRef.current.value;

//         axios
//             .post(REACT_APP_BASE_URL + '/user/login', {
//                 email,
//                 password,
//             })
//             // }, {withCredentials: true})
//             .then((response) => {
//                 localStorage.setItem('token', response.data);
//                 localStorage.setItem('authData', JSON.stringify(response.data));
//                 console.log(localStorage.getItem('token'));
//                 const authData = JSON.parse(localStorage.getItem('authData'));
//                 console.log(authData.data._id);
//                 // login(authData.data._id);
//                 window.location.reload();
//                 navigate('/', {replace: true});

//                 // if(authData) {
//                 //     const authData = JSON.parse(localStorage.getItem('authData'));
//                 // M.toast({html: 'Login Successful', classes: 'green'});

//             })
//             .catch((err) => {
//                 if (err && err.response)
//                     // M.toast({
//                     //     html: 'Error:' + err.toString(),
//                     //     classes: 'red',
//                     console.log(err.toString());

//                     // });
//                 else if (err && err.response && err.response.data)
//                     // M.toast({ html: 'Error:' + err.response.data.message.toString() + "88\n", classes:'red'});
//                     console.log(err.response.data.message.toString());
//                 // M.toast({ html: 'Error:' + err.toString(), classes:'red'});
//                 else if (err.response && err.response.data)
//                     console.log(err.response.data.message);
//                 // M.toast({html: err?.response?.data?.message, classes: 'red'});
//             });
//     };

//     return (
//         <div className="container">
//             <div className="card-container">
//                 <div className="card">
//                     <div className="card__header">Login</div>
//                     <form className="card__body" onSubmit={loginUser}>
//                         <div className="input-group">
//                             <label htmlFor="email">Email</label>
//                             <input
//                                 type="email"
//                                 name="email"
//                                 id="email"
//                                 placeholder="abc@example.com"
//                                 ref={emailRef}
//                             />
//                         </div>
//                         <div className="input-group">
//                             <label htmlFor="password">Password</label>
//                             <input
//                                 type="password"
//                                 name="password"
//                                 id="password"
//                                 placeholder="Your Password"
//                                 ref={passwordRef}
//                             />
//                         </div>
//                         <button>Login</button>
//                         <button onClick={() => navigate('/register')}>
//                             Create A New Account
//                         </button>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default LoginScreen;

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ClientContext } from '../ClientContext';

const defaultTheme = createTheme();

export default function LoginScreen() {
    const emailRef = React.createRef();
    const passwordRef = React.createRef();
    const navigate = useNavigate();
    const REACT_APP_BASE_URL = 'http://localhost:5000';

    const loginUser = (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const email = data.get('email');
        const password = data.get('password');

        axios
            .post(REACT_APP_BASE_URL + '/user/login', {
                email,
                password,
            })
            // }, {withCredentials: true})
            .then((response) => {
                localStorage.setItem('token', response.data);
                localStorage.setItem('authData', JSON.stringify(response.data));
                console.log(localStorage.getItem('token'));
                const authData = JSON.parse(localStorage.getItem('authData'));
                console.log(authData.data._id);
                // login(authData.data._id);
                window.location.reload();
                navigate('/', { replace: true });
            })
            .catch((err) => {
                if (err && err.response) console.log(err.toString());
                else if (err && err.response && err.response.data)
                    console.log(err.response.data.message.toString());
                else if (err.response && err.response.data)
                    console.log(err.response.data.message);
            });
    };
    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: '#ec8a1a' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box
                        component="form"
                        onSubmit={loginUser}
                        noValidate
                        sx={{ mt: 1 }}
                    >
                        <TextField
                            margin="normal"
                            color="warning"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            color="warning"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox value="remember" color="primary" />
                            }
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            color="warning"
                            variant="contained"
                            sx={{
                                mt: 3,
                                mb: 2,
                                height: '45px',
                                // backgroundColor: '#ec8a1a',
                                borderRadius: 5,
                            }}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="/register" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
