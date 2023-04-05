import React, { useState, useEffect } from 'react'
import { AppBar, Typography, Toolbar, Button } from '@material-ui/core'
import useStyle from './styles'
import memories from "../../images/memories.png"
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'
import decode from 'jwt-decode'

const NavBar = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyle();
  const location = useLocation();

  const logout = () => {
    dispatch({ type: "LOGOUT" })
    history.push('/')
    setUser(null)
  }
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const [url, setUrl] = useState();
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('profile')))

    const token = user?.token 

    if(token){
      const decodedToken = decode(token)
      if(decodedToken.exp * 1000 < new Date().getTime()){
        logout();
      }
    }
  }, [location])
  const [name, setName] = useState(null);
 
  
  
  setTimeout(() => {
    if (user) {
      if (user.token.length < 500) {
        setName(user.result.name);


      } else {
        setName(user.user.displayName)
        setUrl(user.user.photoURL)
      }
    }

  }, 100)
 
  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <div className={classes.brandContainer}>
        <Typography className={classes.heading} component={Link} to="/" variant='h2' align='center'>Memories</Typography>
        <img className={classes.image} src={memories} alt="" height='60'></img>
      </div>
      <Toolbar>
        {
          user ? (
            <div className={classes.profile}>
              {/* <Avatar className={classes.purple} alt={name} src={url}></Avatar> */}
              {/* <Typography className={classes.welcome}   variant='h4' align='center'>Welcome</Typography> */}
              <Typography className={classes.welcome} variant='h5'>{name}</Typography>
              <Button variant='contained' className={classes.logout} color="secondary" onClick={logout}>Log Out</Button>
            </div>
          ) : (
            <Button variant='contained' component={Link} to='/auth' color='primary'>Sign In</Button>
          )
        }
      </Toolbar>
    </AppBar>
  )
}

export default NavBar