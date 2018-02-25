import React from 'react';
import { Link } from 'react-router-dom';
import * as api from '../api';

class Loginform extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      password: '',
      submissionMsg: '',
    };

    this.handelOnchange = this.handelOnchange.bind(this);
    this.handelLogin = this.handelLogin.bind(this);
  }

  componentDidUpdate() {
    console.log('enter componentDidUpdate Login');
    if (this.state.submissionMsg !== '') {
      if (this.state.submissionMsg === 'User Found') {
        window.location = 'Myrequest';
      } else {
        setTimeout(() => {
          this.setState({ submissionMsg: '' });
        }, 2000);
      }
    }
  }

  handelOnchange(event) {
    this.setState({
      [event.target.id]: event.target.value,
    });
  }

  handelLogin(event) {
    api.loginUserDetail(this.state.userName, this.state.password)
      .then(resp => this.setState({
        submissionMsg: resp,
        userName: '',
        password: '',
      }));
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <h1 >
      Login Form
        </h1>
        <form onSubmit={this.handelLogin}>
          User Name <br />
          <input type="text" value={this.state.userName} id="userName" onChange={this.handelOnchange} /><br /><br />
          Password <br />
          <input type="password" value={this.state.password} id="password" onChange={this.handelOnchange} /><br /><br />
          <div>
            <span><b>{this.state.submissionMsg}</b></span>
          </div>
          <button type="submit"> Login </button>
        </form>
        <div>
          <Link to="/" >Sign Up</Link>
        </div>
      </div>
    );
  }
}


export default Loginform;
