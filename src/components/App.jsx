import React from 'react';
import Myform from './form';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      header: 'Registration Form',
    };
  }
  render() {
    return (
      <div>
        <h1>
          {this.state.header}
        </h1>
        <Myform />
      </div>
    );
  }
}

export default App;
