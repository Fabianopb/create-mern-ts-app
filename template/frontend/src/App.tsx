import axios from "axios";
import React from "react";
import "./App.css";
import logo from "./logo.svg";
import { isSessionValid, setSession, clearSession, getAuthHeaders } from "./session";

export interface AppState {
  email: string;
  password: string;
  isRequesting: boolean;
  isLoggedIn: boolean;
  data: App.Item[];
  error: string;
}

class App extends React.Component<{}, AppState> {
  public state = {
    email: "",
    password: "",
    isRequesting: false,
    isLoggedIn: false,
    data: [],
    error: "",
  };

  public componentDidMount() {
    this.setState({ isLoggedIn: isSessionValid() });
  }

  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div className="App-error">{this.state.error}</div>
        {this.state.isLoggedIn ? (
          <div className="App-private">
            <div>
              Server test data:
              <ul>
                {this.state.data.map((item: App.Item, index) => (
                  <li key={index}>
                    name: {item.name} / value: {item.value}
                  </li>
                ))}
              </ul>
            </div>
            <button disabled={this.state.isRequesting} onClick={this.getTestData}>
              Get test data
            </button>
            <button disabled={this.state.isRequesting} onClick={this.logout}>
              Log out
            </button>
          </div>
        ) : (
          <div className="App-login">
            (try the credentials: testuser@email.com / my-password)
            <input
              disabled={this.state.isRequesting}
              placeholder="email"
              type="text"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({ email: e.target.value })}
            />
            <input
              disabled={this.state.isRequesting}
              placeholder="password"
              type="password"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({ password: e.target.value })}
            />
            <button disabled={this.state.isRequesting} onClick={this.handleLogin}>
              Log in
            </button>
          </div>
        )}
      </div>
    );
  }

  private handleLogin = async (): Promise<void> => {
    const { email, password } = this.state;
    try {
      this.setState({ error: "" });
      this.setState({ isRequesting: true });
      const response = await axios.post<{ token: string; expiry: string }>("/api/users/login", { email, password });
      const { token, expiry } = response.data;
      setSession(token, expiry);
      this.setState({ isLoggedIn: true });
    } catch (error) {
      this.setState({ error: "Something went wrong" });
    } finally {
      this.setState({ isRequesting: false });
    }
  };

  private logout = (): void => {
    clearSession();
    this.setState({ isLoggedIn: false });
  };

  private getTestData = async (): Promise<void> => {
    try {
      this.setState({ error: "" });
      const response = await axios.get<App.Item[]>("/api/items", { headers: getAuthHeaders() });
      this.setState({ data: response.data });
    } catch (error) {
      this.setState({ error: "Something went wrong" });
    } finally {
      this.setState({ isRequesting: false });
    }
  };
}

export default App;
