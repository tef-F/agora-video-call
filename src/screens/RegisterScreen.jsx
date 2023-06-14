// import React from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// // import M from "materialize-css";

// const RegisterScreen = (props) => {
//     const nameRef = React.createRef();
//     const usernameRef = React.createRef();
//     const emailRef = React.createRef();
//     const passwordRef = React.createRef();
//     const navigate = useNavigate();
//     const REACT_APP_BASE_URL= 'http://localhost:5000';

//     const registerUser = (props) => {
//         const name = nameRef.current.value;
//         const username = usernameRef.current.value;
//         const email = emailRef.current.value;
//         const password = passwordRef.current.value;

//         axios
//             .post(REACT_APP_BASE_URL + "/user/register", {
//                 name,
//                 username,
//                 email,
//                 password,
//             })
//             .then((response) => {
//                 // M.toast({html: 'User created, Login first!', classes: 'green'});
//                 navigate("/login");
//             })
//             .catch((err) => {
//                 console.log(err)
//                 // if(err.response && err.response.data) console.log(err.response.data.message);
//                 // M.toast({html: err.response.data.message, classes: 'red'});
//             });
//     };

//     return (
//         <div className="container">
//             <div className="card-container">
//                 <div className="card">
//                     <div className="card__header">Register</div>
//                     <div className="card__body">
//                         <div className="input-group">
//                             <label htmlFor="name">Name</label>
//                             <input
//                                 type="text"
//                                 name="name"
//                                 id="name"
//                                 placeholder="John Doe"
//                                 ref={nameRef}
//                             />
//                         </div>
//                         <div className="input-group">
//                             <label htmlFor="username">UserName</label>
//                             <input
//                                 type="text"
//                                 name="username"
//                                 id="username"
//                                 placeholder="John Doe"
//                                 ref={usernameRef}
//                             />
//                         </div>
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
//                     </div>
//                     <div className="input-group">
//                         <label htmlFor="password">Password</label>
//                         <input
//                             type="password"
//                             name="password"
//                             id="password"
//                             placeholder="Your Password"
//                             ref={passwordRef}
//                         />
//                     </div>
//                     <button onClick={registerUser}>Register</button>
//                     <button onClick={() => navigate('/login')}>Login</button>
//                 </div>

//             </div>
//         </div>
//     );
// };

// export default RegisterScreen;
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

const defaultTheme = createTheme();

export default function RegisterScreen() {
    const navigate = useNavigate();
    const REACT_APP_BASE_URL = 'http://localhost:5000';

    const registerUser = (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);

        const name = data.get('name');
        const username = data.get('username');
        const email = data.get('email');
        const password = data.get('password');

        axios
            .post(REACT_APP_BASE_URL + '/user/register', {
                name,
                username,
                email,
                password,
            })
            .then((response) => {
                // M.toast({html: 'User created, Login first!', classes: 'green'});
                navigate('/login');
            })
            .catch((err) => {
                console.log(err);
                // if(err.response && err.response.data) console.log(err.response.data.message);
                // M.toast({html: err.response.data.message, classes: 'red'});
            });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get('email'),
            password: data.get('password'),
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
                        Sign up
                    </Typography>
                    <Box
                        component="form"
                        noValidate
                        onSubmit={handleSubmit}
                        sx={{ mt: 3 }}
                    >
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    color="warning"
                                    autoComplete="given-name"
                                    name="name"
                                    required
                                    fullWidth
                                    id="name"
                                    label="Name"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    color="warning"
                                    required
                                    fullWidth
                                    id="userName"
                                    label="User Name"
                                    name="username"
                                    autoComplete="family-name"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    color="warning"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    color="warning"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    color="warning"
                                    required
                                    fullWidth
                                    name="linkAvt"
                                    label="Link Avatar"
                                    type="linkAvt"
                                    id="linkAvt"
                                    autoComplete="new-linkAvt"
                                />
                            </Grid>
                        </Grid>
                        <Button
                            color="warning"
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{
                                mt: 3,
                                mb: 2,
                                height: '45px',
                                // backgroundColor: '#ec8a1a',
                                borderRadius: 5,
                            }}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="/login" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
