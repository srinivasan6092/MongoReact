import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Myform from './components/form';
import Myloginform from './components/Loginform';
import Myrequest from './components/Myrequest';

const Main = () => (
  <Switch>
    <Route exact path="/" component={Myform} />
    <Route path="/Login" component={Myloginform} />
    <Route path="/Myrequest" component={Myrequest} />
  </Switch>
);

export default Main;
