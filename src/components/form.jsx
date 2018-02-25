import React from 'react';
import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';
import * as api from '../api';

// const saltRounds = 10;

class Myform extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      emailId: '',
      submissionMsg: '',
    };

    this.handelOnChange = this.handelOnChange.bind(this);
    this.handelSubmit = this.handelSubmit.bind(this);
  }

  componentDidMount() {
    console.log('enter DID Mount');
  }

  componentDidUpdate() {
    console.log('enter componentDidUpdate');
    if (this.state.submissionMsg !== '') {
      setTimeout(() => {
        this.setState({ submissionMsg: '' });
      }, 2000);
    }
  }

  handelOnChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }

  handelSubmit(event) {
    // hashpassword = this.state.password;
    // console.log(this.state.password);

    api.registerUser(this.state.emailId, this.state.username, this.state.password)
      .then(resp => this.setState({
        submissionMsg: resp,
        username: '',
        password: '',
        emailId: '',
      }));
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <h1 >
          Registration Form
        </h1>
        <form onSubmit={this.handelSubmit} >
          Name <br />
          <input type="text" id="username" value={this.state.username} onChange={this.handelOnChange} /><br /><br />
        Email <br />
          <input type="email" id="emailId" value={this.state.emailId} onChange={this.handelOnChange} /><br /><br />
        Password <br />
          <input type="password" id="password" value={this.state.password} onChange={this.handelOnChange} /><br /><br />
          <div>
            <span><b>{this.state.submissionMsg}</b></span>
          </div>
          <button type="submit" > Submit </button>
        </form>
        <div>
          <Link to="/login" >Login</Link>
        </div>
      </div>
    );
  }
}

/* Myform.propTypes = {
  loginOnClick: PropTypes.func.isRequired,
}; */

export default Myform;
