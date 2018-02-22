import React from 'react';
import bcrypt from 'bcryptjs';
import api from '../api';

// const saltRounds = 10;

class Myform extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      emailId: '',
    };

    this.handelOnChange = this.handelOnChange.bind(this);
    this.handelSubmit = this.handelSubmit.bind(this);
  }

  handelOnChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }

  handelSubmit(event) {
    // hashpassword = this.state.password;
    console.log(this.state.password);
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(this.state.password, salt, (err1, hash) => {
        api(this.state.emailId, this.state.username, hash);
      });
    });
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handelSubmit} >
          Name <br />
        <input type="text" id="username" value={this.state.username} onChange={this.handelOnChange} /><br />
        Email <br />
        <input type="email" id="emailId" value={this.state.emailId} onChange={this.handelOnChange} /><br />
        Password <br />
        <input type="password" id="password" value={this.state.password} onChange={this.handelOnChange} /><br /><br />
        <button type="submit" > Submit </button>
      </form>
    );
  }
}

export default Myform;
