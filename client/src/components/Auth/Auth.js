import React, {useState} from 'react'
import {Button, Avatar, Grid, Typography, Container, Paper} from '@material-ui/core'
import {GoogleLogin} from 'react-google-login'
import {useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import useStyles from './styles.js'
import Icon from './Icon'
import Input from './Input'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import {signup, signin} from '../../actions/auth'

const initialState = {firstName: '', lastName: '', email: '', password: '', confirmPassword: ''}
const Auth = () => {
 const classes = useStyles()
 const dispatch = useDispatch()
 const navigate = useNavigate()
 const [showPassword, setShowPassword] = useState(false)
 const [formData, setFormData] = useState(initialState)
 const [isSignup, setIsSignUp] = useState(true)
 const handleSubmit = (e) => {
  e.preventDefault()
  console.log(formData)
  if (isSignup) {
   dispatch(signup(formData, navigate))
  } else {
   dispatch(signin(formData, navigate))
  }
 }
 const handleChange = (e) => {
  //This is The important Concept To include current Changing Input Field
  setFormData({...formData, [e.target.name]: e.target.value})
 }
 const switchMode = () => setIsSignUp((prevState) => !prevState)

 const googleSuccess = async (res) => {
  //What are the different properties we get after google Succes.
  // console.log(res);
  const result = res?.profileObj
  const token = res?.tokenId
  try {
   dispatch({type: 'AUTH', data: {result, token}}) //Go to Reducer
   //After dispatch we have to redirect back to home.
   navigate('/')
  } catch (error) {
   console.log(error)
  }
  console.log(res)
 }
 const googleFailure = (error) => {
  console.log(error)
  console.log('Google sign in failure this is  not working')
 }
 const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword)
 return (
  <>
   <Container component="main" maxWidth="xs">
    <Paper className={classes.paper} elevation={3}>
     {/* if we have Many Input Fields That Looks Like Same */}
     <Avatar className={classes.avatar}>
      <LockOutlinedIcon />
     </Avatar>
     <Typography varient="h5">{isSignup ? 'SignUp' : 'SignIn'}</Typography>
     <form className={classes.form} onSubmit={handleSubmit}>
      <Grid container spacing={2}>
       {isSignup && (
        <>
         <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
         <Input name="lastName" label="Last Name" handleChange={handleChange} half />
        </>
       )}
       <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
       <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
       {isSignup && <Input name="confirmPassword" label="Confirm Password" handleChange={handleChange} type="password" handleShowPassword={handleShowPassword} />}
      </Grid>
      <Button type="submit" variant="contained" fullWidth color="primary" className={classes.submit}>
       {isSignup ? 'SignUp' : 'SignIn'}
      </Button>
      <GoogleLogin
       clientId="484186901299-a34oi29mnr2b5sbq0obnq4e82i7rnvsg.apps.googleusercontent.com"
       render={(renderProps) => (
        <Button className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} variant="contained" startIcon={<Icon />}>
         Google Login
        </Button>
       )}
       onSuccess={googleSuccess}
       onFailure={googleFailure}
       cookiePolicy={'single_host_origin'}
      />
      <Grid container justify="flex-end">
       <Grid item>
        <Button onClick={switchMode}>{isSignup ? 'Already have an Account? SignIn' : "Don't Have an Account? SignUp"}</Button>
       </Grid>
      </Grid>
     </form>
    </Paper>
   </Container>
  </>
 )
}

export default Auth