import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Myform from './components/form';
import Myloginform from './components/Loginform';

const Main = () => (
  <Switch>
    <Route exact path="/" component={Myform} />
    <Route path="/Login" component={Myloginform} />
  </Switch>
);

export default Main;
