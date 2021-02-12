import React, { useState, useEffect } from 'react';
import { Route, useHistory } from 'react-router-dom';
import Login from './Login';
import SynthEditor from './SynthEditor';
import UserPage from './UserPage';
import SynthIndex from './SynthIndex';
import CustomStyles from './CustomStyles';

import { makeStyles } from '@material-ui/core/styles';

function App() {
  const [users, setUsers] = useState([])
  const [synths, setSynths] = useState([])
  const [currentUser, setCurrentUser] = useState()
  const [currentSynth, setCurrentSynth] = useState()
  const [loggedIn, setLoggedIn] = useState(false)
  const history = useHistory();
  
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/users`)
      .then(resp => resp.json())
      .then(data => {
        console.log(data)
        setUsers(data)
      })
  }, [])

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/synths`)
      .then(resp => resp.json())
      .then(data => {
        console.log(data)
        setSynths(data)
      })
  }, [])

  function handleLogin(user){
    setLoggedIn(true)
    setCurrentUser(user)
  }

  function handleLogout(){
    fetch(`${process.env.REACT_APP_API_BASE_URL}/logout`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      credentials: 'include',
      })
      .then(resp => resp.json())
      .then(response => {
          console.log(response)
          setLoggedIn(false)
          setCurrentUser({})
          history.push("/")
      })

  }

  const loginStatus = () => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/logged_in`, {credentials: 'include'})  
      .then(resp => resp.json())  
      .then(response => {
        console.log(response)
        if (response.logged_in) {
          handleLogin(response.user)
        } else {
          handleLogout()
        }
      })
  };

  useEffect(loginStatus, []);

  //Material-UI styles to send to class-component-style components, can't use the hooks in the class components themselves
  // const useStyles = makeStyles((theme) => ({
  //   root: {
  //       flexGrow: 1,
  //   },
  //   paper: {
  //       padding: theme.spacing(2),
  //       textAlign: 'center',
  //       border: "3px solid purple",
  //   },
  // }));

  // const classes = useStyles();
  const classes = CustomStyles();
  ///////////////////////////////////

  return (
    <div className="app-container">
      <Route exact path='/'>
        <Login classes={classes} users={users} onSetUsers={setUsers} onSetCurrentUser={setCurrentUser} handleAuthLogin={handleLogin} loggedIn={loggedIn} />
      </Route>
      
      <Route path='/syntheditor'>
        <SynthEditor classes={classes} history={history} synth={currentSynth} currentUser={currentUser} synths={synths} loggedIn={loggedIn} onLogout={handleLogout} />
      </Route>

      <Route path='/userpage'>
        <UserPage classes={classes} onSetCurrentSynth={setCurrentSynth} onSetSynths={setSynths} currentUser={currentUser} synths={synths} loggedIn={loggedIn} onLogout={handleLogout} />
      </Route>

      <Route path='/index'>
        <SynthIndex classes={classes} synths={synths} currentUser={currentUser} onSetCurrentSynth={setCurrentSynth} loggedIn={loggedIn} onLogout={handleLogout} />
      </Route>
    </div>
  );
}

export default App;
