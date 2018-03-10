import React from 'react';
import { Link } from 'react-router-dom';

const Mytask = () => (
  <div>
    <h1>
      Welcome {window.userdetail.userName} !!
    </h1>
            My Task <br /> <br />
    <div>
      <Link to="/Myrequest" >My Request</Link>
      <span> |  </span>
      <Link to="/Mytask" >My Task</Link>
      <span> |  </span>
      <a href="/logout"> Logout </a>
    </div>
  </div>
);

export default Mytask;
