import React, { useState, useEffect } from 'react';
import { Route, useHistory } from 'react-router-dom';
import Login from './Login';
import SynthEditor from './SynthEditor';
import UserPage from './UserPage';
import SynthIndex from './SynthIndex';
import PlayerKeyboard from './PlayerKeyboard';

import CustomStyles from './CustomStyles';

function App() {
  const [synths, setSynths] = useState([])
  const [currentUser, setCurrentUser] = useState()
  const [currentSynth, setCurrentSynth] = useState()
  const [loggedIn, setLoggedIn] = useState(false)
  const history = useHistory();
  const url = process.env.NODE_ENV === 'production' ? "https://synthesizio-backend.herokuapp.com" : "http://localhost:3000"

  useEffect(() => {
    fetch(`${url}/synths`)
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
    fetch(`${url}/logout`, {
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
    fetch(`${url}/logged_in`, {credentials: 'include'})  
      .then(resp => resp.json())  
      .then(response => {
        if (response.logged_in) {
          handleLogin(response.user)
        } else {
          handleLogout()
        }
      })
  };

  useEffect(loginStatus, []);

  const classes = CustomStyles();

  return (
    <div className="app-container">
      <Route exact path='/'>
        <Login classes={classes} handleAuthLogin={handleLogin} loggedIn={loggedIn} />
      </Route>
      
      <Route path='/syntheditor'>
        {currentUser !== undefined ?
          <SynthEditor classes={classes} history={history} onSetCurrentSynth={setCurrentSynth} synth={currentSynth} currentUser={currentUser} synths={synths} loggedIn={loggedIn} onLogout={handleLogout} />
          :
          <Login classes={classes} handleAuthLogin={handleLogin} loggedIn={loggedIn} />
        }
      </Route>

      <Route path='/userpage'>
        {currentUser !== undefined ?
          <UserPage classes={classes} onSetCurrentSynth={setCurrentSynth} onSetSynths={setSynths} currentUser={currentUser} synths={synths} loggedIn={loggedIn} onLogout={handleLogout} />
          :
          <Login classes={classes} handleAuthLogin={handleLogin} loggedIn={loggedIn} />
        }
      </Route>

      <Route path='/index'>
        {currentUser !== undefined ? 
          <SynthIndex classes={classes} synths={synths} currentUser={currentUser} onSetCurrentSynth={setCurrentSynth} loggedIn={loggedIn} onLogout={handleLogout} />
          :
          <Login classes={classes} handleAuthLogin={handleLogin} loggedIn={loggedIn} />
        }
      </Route>

      <Route path='/player'>
        {currentUser !== undefined ? 
          <PlayerKeyboard synth={currentSynth} classes={classes} onLogout={handleLogout} />
          :
          <Login classes={classes} handleAuthLogin={handleLogin} loggedIn={loggedIn} />
        }
      </Route>
    </div>
  );
}

export default App;
