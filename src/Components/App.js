import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';
import Login from './Login';
import SynthEditor from './SynthEditor';
import UserPage from './UserPage';

function App() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/users`)
      .then(resp => resp.json())
      .then(data => {
        console.log(data)
        setUsers(data)
      })
  }, [])

  return (
    <div>
      <Route exact path= '/'>
        <Login />
      </Route>
      
      <Route path = '/syntheditor'>
        <SynthEditor />
      </Route>

      <Route path = '/userpage'>
        <UserPage />
      </Route>
    </div>
  );
}

export default App;
