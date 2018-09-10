import axios from "axios";
import * as React from 'react';
import './App.css';
import logo from './logo.svg';

export interface IAppState {
  message: string;
}

class App extends React.Component<{}, IAppState> {
  public state = {
    message: ""
  };

  public async componentDidMount() {
    const response = await axios.get("/api/test-route");
    this.setState({ message: response.data });
  }

  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </p>
        <p>
          Server test response: {this.state.message}
        </p>
      </div>
    );
  }
}

export default App;
