import React from 'react';
import Main from '../Main';

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
        <Main />
      </div>
    );
  }
}

export default App;
