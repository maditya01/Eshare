import React, { useState } from 'react'
import { Button, Avatar, Grid, Typography, Container, Paper } from '@material-ui/core'
import { GoogleLogin } from 'react-google-login'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import useStyles from './styles.js'
import Icon from './Icon'
import Input from './Input'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import { signup, signin } from '../../actions/auth'

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' }
const Auth = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState(initialState)
  const [isSignup, setIsSignUp] = useState(true)

  /*When we submit form button this function will be called */
  const handleSubmit = (e) => {
    e.preventDefault()
    if (isSignup) {
      dispatch(signup(formData, navigate))
    } else {
      dispatch(signin(formData, navigate))
    }
  }

  /*Validate email password and confirm password according to normal condition */
  const validatorHandler = () => {
    if (isSignup) {
      if (!(formData.email).includes("@")) return true;
      if (!formData.password.length >= 8) return true;
      if (!(formData.password === formData.confirmPassword)) return true;
    } else {
      if (!(formData.email).includes("@")) return true;
      if (!formData.password.length >= 8) return true;
    }
    return false;
  }

  /*This method will be called when we change any input field */
  const handleChange = (e) => {
    /*This is the important concept to include current changing input field
     There are 2 methods by which we can update state either make state for everyone input field
    */
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  /*This method will be called when we switch mode from sign-up to sign-in */
  const switchMode = () => {
    setFormData(initialState)
    setIsSignUp((prevIsSignup) => !prevIsSignup)
    setShowPassword(false)
  }

  /*When we sign-in using Google api If we successfull then this method will be called */
  const googleSuccess = async (res) => {
    /* What are the different properties we get after google success.
    What is happeing here??
    */
    const result = res?.profileObj
    const token = res?.tokenId
    try {
      /*What is happening here??*/
      dispatch({ type: 'AUTH', data: { result, token } })
      /*After dispatch we have to redirect back to home.*/
      navigate('/memories')
    } catch (error) {
      console.log(error)
    }
  }

  /*When we sign-in using Google api If we failed then this method will be called */
  const googleFailure = (error) => {
    console.log(error)
  }

  /* */
  const renderGoogleLogin = (renderProps) => (
    <Button className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} variant="contained" startIcon={<Icon />}>
      Google Login
    </Button>
  )

  /* When we click show password icon this method will be called*/
  const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword)

  return (
    <>
      <Container component="main" maxWidth="xs">
        <Paper className={classes.paper} elevation={3}>
          {/* if we have Many Input Fields That Looks Like Same */}
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography variant="h5">{isSignup ? 'SignUp' : 'SignIn'}</Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {isSignup && (
                <>
                  <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                  <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                </>
              )}
              <Input name="email" value={formData.email} label="Email Address" handleChange={handleChange} type="email" />
              <Input name="password" value={formData.password} label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
              {isSignup && <Input name="confirmPassword" label="Confirm Password" handleChange={handleChange} type="password" handleShowPassword={handleShowPassword} />}
            </Grid>
            {/* Normal Email Password Login Method */}
            <Button disabled={validatorHandler()} type="submit" variant="contained" fullWidth color="primary" className={classes.submit}>
              {isSignup ? 'Sign Up' : 'Sign In'}
            </Button>
            {/* Google Login Component Code  */}
            <GoogleLogin clientId="484186901299-a34oi29mnr2b5sbq0obnq4e82i7rnvsg.apps.googleusercontent.com" render={renderGoogleLogin} onSuccess={googleSuccess} onFailure={googleFailure} cookiePolicy={'single_host_origin'} />
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Button onClick={switchMode}>{isSignup ? 'Already have an Account? SignIn' : "Don't Have an Account? SignUp"}</Button>
              </Grid>
            </Grid>
          </form>
          {/* Ending of Form */}
        </Paper>
      </Container>
    </>
  )
}

export default Auth
