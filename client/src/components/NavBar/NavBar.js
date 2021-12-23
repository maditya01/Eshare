import React, {useState, useEffect} from 'react'
import useStyles from './styles'
import {AppBar, Avatar, Button, Toolbar, Typography} from '@material-ui/core'
import {useDispatch} from 'react-redux'
import {Link, useNavigate, useLocation} from 'react-router-dom'
import decode from 'jwt-decode'
//importing image from image folder
//I HAVE SOME PROBLME IN THIS FILE
import memories from '../../images/memories.png'
const NavBar = ({text}) => {
 const classes = useStyles()
 const dispatch = useDispatch()
 const navigate = useNavigate()
 const location = useLocation()
 console.log('printing locatoin')
 console.log(location)
 const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
 const logout = () => {
  dispatch({type: 'LOGOUT'})
  setUser(null)
  navigate(`/`)
 }
 //When Url changes to '/auth'->'/' then we have to call it
 useEffect(() => {
  //   const token = user?.tokent
  //   if (token) {
  //    const decodedToken = decode(token)
  //    if (decodedToken.exp * 1000 < new Date().getTime()) {
  //     logout()
  //    }
  //   }
  setUser(JSON.parse(localStorage.getItem('profile')))
 }, [location])
 return (
  <AppBar className={classes.appBar} position="static" color="inherit">
   <div className={classes.brandContainer}>
    <Typography component={Link} to={location.pathname} className={classes.heading} variant="h3" align="center">
     {text}
    </Typography>
    <img className={classes.image} src={memories} alt="icon" height="60" />
   </div>

   <Toolbar className={classes.toolbar}>
    {user ? (
     <div className={classes.profile}>
      <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}></Avatar>
      <Typography className={classes.userName} varient="h6">
       {user.result.name}
      </Typography>
      <Button className={classes.logout} variant="contained" color="primary" onClick={logout}>
       LogOut
      </Button>
     </div>
    ) : (
     <Button component={Link} to="/auth" variant="contained" color="primary">
      SignIn
     </Button>
    )}
   </Toolbar>
  </AppBar>
 )
}

export default NavBar
