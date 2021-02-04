import React, { useState, useEffect } from 'react';
import { Route, useHistory } from 'react-router-dom';
import Login from './Login';
import SynthEditor from './SynthEditor';
import UserPage from './UserPage';

function App() {
  const [users, setUsers] = useState([])
  const [synths, setSynths] = useState([])
  const history = useHistory();
  console.log("page change")

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

  return (
    <div>
      <Route exact path= '/'>
        <Login />
      </Route>
      
      <Route path = '/syntheditor'>
        <SynthEditor history={history} />
      </Route>

      <Route path = '/userpage'>
        <UserPage synths={synths} />
      </Route>
    </div>
  );
}

export default App;
