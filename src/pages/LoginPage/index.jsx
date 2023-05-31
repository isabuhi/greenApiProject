import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Wrapper from '../../components/Wrapper/index';



import { authApi } from '../../api/authApi';
import { setAccount } from '../../redux/authSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";




const defaultTheme = createTheme();

export default function LoginPage() {
    const [form, setForm] = React.useState({id: null, token: null})

    const dispatch = useDispatch()
    const navigate = useNavigate()


    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const params = { id: data.get("instanceId"), apiToken: data.get("tokenApi") }

        authApi.getAccountStatus(params)
            .then((response) => {
                if (response.instanceState !== "authorized") {
                    /* here vill be condition statement */
                }
                dispatch(setAccount({ ...response.data, ...params }))
                authApi.getAccountSettings(params)
                    .then((response) => {
                        dispatch(setAccount(response.data))
                    })
                navigate("/chat")
            })
            .catch((error) => {

            })
    };

    return (
        <Wrapper>
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
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>

                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Log in
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="instanceId"
                                label="ID instance"
                                name="instanceId"
                                type="text"
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="tokenApi"
                                label="Api token"
                                type="text"
                                id="tokenApi"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Log In
                            </Button>
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider>

        </Wrapper>
    );
}