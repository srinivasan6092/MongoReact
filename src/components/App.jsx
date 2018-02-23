import React from 'react';
import Myform from './form';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      header: 'React Component C',
    };
  }
  render() {
    return (
      <div>
        <h1>
          {this.state.header}
        </h1>
        <div>
                Welcome to a Componet Construction
        </div>
        <Myform />
      </div>
    );
  }
}

export default App;
