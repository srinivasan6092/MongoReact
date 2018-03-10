import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Myform from './components/form';
import Myloginform from './components/Loginform';
import Myrequest from './components/Myrequest';
import Mytask from './components/Mytask';

const Main = () => (
  <Switch>
    <Route exact path="/" component={Myform} />
    <Route path="/Login" component={Myloginform} />
    <Route path="/Myrequest" component={Myrequest} />
    <Route path="/Mytask" component={Mytask} />
  </Switch>
);

export default Main;
