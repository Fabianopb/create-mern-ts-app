import axios from "axios";
import * as React from 'react';
import './App.css';
import * as session from './session';
import logo from './logo.svg';

export interface IAppState {
  email: string;
  password: string;
  isLoggedIn: boolean;
  response: string;
  error: string;
}

class App extends React.Component<{}, IAppState> {
  public state = {
    email: "",
    password: "",
    isLoggedIn: false,
    response: "",
    error: ""
  };

  public componentDidMount() {
    this.setState({ isLoggedIn: session.isSessionValid() });
  }

  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        {this.state.isLoggedIn ? (
          <div className="App-private">
            <p>
              Server test response: {this.state.response}
            </p>
            <button onClick={this.getTestData}>Get test data</button>
            <button onClick={this.logout}>Log out</button>
          </div>
        ) : (
          <div className="App-login">
            <input
              placeholder="email"
              type="text"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({ email: e.target.value })}
            />
            <input
              placeholder="password"
              type="password"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({ password: e.target.value })}
            />
            <button onClick={this.handleLogin}>Log in</button>
            <div className="App-error">{this.state.error}</div>
          </div>
        )}
      </div>
    );
  }

  private handleLogin = async (): Promise<void> => {
    const { email, password } = this.state;
    try {
      const response = await axios.post<{ token: string; expiry: string }>("/api/users/login", { email, password });
      const { token, expiry } = response.data;
      session.setSession(token, expiry);
      this.setState({ isLoggedIn: true });
    } catch (error) {
      this.setState({ error: error.response.data.error });
    }
  };

  private logout = () => {
    session.clearSession();
    this.setState({ isLoggedIn: false });
  };

  private getTestData = async (): Promise<void> => {
    const response = await axios.get("/api/test-route");
    this.setState({ response: response.data });
  }
}

export default App;
