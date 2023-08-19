import React, {useState, useEffect} from 'react'
import useStyles from './styles'
import {AppBar, Avatar, Button, Toolbar, Typography} from '@material-ui/core'
import {useDispatch} from 'react-redux'
import {Link, useNavigate, useLocation} from 'react-router-dom'
import decode from 'jwt-decode'
import memories from '../../images/memories.png'

const NavBar = ({text}) => {
    // console.log("NavBar 3");
 const classes = useStyles()
 const dispatch = useDispatch()

 const navigate = useNavigate()
 const location = useLocation()
//  console.log(location);

 const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
 const logout = () => {
  dispatch({type: 'LOGOUT'})
  setUser(null)
  navigate(`/memories`)
 }
 useEffect(() => {
   console.log("in Useeffect")
   console.log(location)
  const token = user?.token
  console.log(token);
  if (token) {
   const decodedToken = decode(token)
   if (decodedToken.exp * 1000 < new Date().getTime()) logout()
  }
  setUser(JSON.parse(localStorage.getItem('profile')))
 }, [location,user?.token])


 return (
  <AppBar className={classes.appBar} position="static" color="inherit">
   <div className={classes.brandContainer}>
    <Typography component={Link} to="/memories" className={classes.heading} variant="h3" align="center">
     {text}
    </Typography>
    <img className={classes.image} src={memories} alt="icon" height="60" />
   </div>

   <Toolbar className={classes.toolbar}>
    {user ? (
     <div className={classes.profile}>
      <Avatar className={classes.purple} alt={user?.result.name} src={user?.result.imageUrl}></Avatar>
      <Typography className={classes.userName} varient="h6">
       {user?.result.name}
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
