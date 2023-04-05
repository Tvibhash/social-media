import React from 'react'
import { Avatar, Paper, Button, Grid, Typography, Container } from '@material-ui/core'
import useStyles from './styles'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Input from './Input'
import { useState } from 'react'
import { signin, signup } from "../../actions/authAction"
import { auth } from "../../firebase"
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom';
import { GoogleAuthProvider } from "firebase/auth";
import { signInWithPopup } from "firebase/auth";

const initialState = { firstName: "", lastName: "", email: "", password: "", confirmPassword: "" }
const Auth = () => {
    const dispatch = useDispatch();
    const provider = new GoogleAuthProvider();
    const classes = useStyles();
    const [formData, setFormData] = useState(initialState)
    const [showPassword, setShowPassword] = useState(false)
    const [isSignup, setisSignUp] = useState(false);
    const history = useHistory()

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isSignup) {
            dispatch(signup(formData, history))
        } else {
            dispatch(signin(formData, history))
        }
    }

    const switchMode = () => {
        setisSignUp((prevIsSignUp) => !prevIsSignUp);
        setShowPassword(false);
    }

  

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const googleLogin = async (e) => {
        e.preventDefault();
        try {
            const result = await signInWithPopup(auth, provider)
            const user = result.user;
            const token = user.accessToken
            dispatch({ type: "AUTH", data: { user, token } })
            history.push("/")
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Container component='main' maxWidth='xs'>
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon></LockOutlinedIcon>
                </Avatar>
                <Typography variant='h5' >{isSignup ? "Sign Up" : "Sign In"}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {
                            isSignup && (
                                <>
                                    <Input name='firstName' label="First Name" type='text' handleChange={handleChange} />
                                    <Input name='lastName' label="Last Name " type='text' handleChange={handleChange} />
                                </>
                            )
                        }
                        <Input name='email' label="Email Address" type='email' handleChange={handleChange} />
                        <Input name='password' label="Password" type={showPassword ? 'text' : 'password'} handleChange={handleChange} />
                        {isSignup && <Input name="confirmPassword" label='Repeat Password' handleChange={handleChange} type='password' />}
                    </Grid>
                    <Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit} onClick={()=>{}}>{isSignup ? "Sign Up" : "Sign In"}</Button>
                    {
                        !isSignup && (
                            <Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit} onClick={googleLogin}>Sign In With Google</Button>
                        )
                    }
                    <Grid container justifyContent='flex-end'>
                        <Grid item>
                            <Button onClick={switchMode}>{isSignup ? "Already have an account Sign In" : "Dont have an account ? Sign Up"}</Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>

    )
}
export default Auth