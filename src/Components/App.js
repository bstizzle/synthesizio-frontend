import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';
import Login from './Login';
import SynthEditor from './SynthEditor';
import UserPage from './UserPage';

function App() {


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
