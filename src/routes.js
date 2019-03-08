import React from 'react';
import { Switch , Route } from 'react-router-dom';

import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';


export default function Routes() {
  return (
    <Switch>
      <Route path='/signup' component={SignUp}></Route>
      <Route path='/' exact component={Login}></Route>
    </Switch>
  )
}