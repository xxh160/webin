import React from "react";
import "./assets/app.css";
import Login from "./components/login.js";
import Register from "./components/register.js";
import { userRegister, userLogin } from "./apis/user.js";
import { FAILURE } from "./utils/constant";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
    this.pages = ["Home", "Register", "Login"];
    this.state = {
      page: 0,
      hasLogin: false,
    };
  }

  handleLogin(username, password, captcha, captchaId) {
    return new Promise((resolve, reject) => {
      userLogin({
        username: username,
        password: password,
        captcha: captcha,
        captchaId: captchaId,
      }).then((res) => {
        if (res.state === FAILURE) {
          reject(res);
          return;
        }
        this.setState({ page: 0, hasLogin: true });
        resolve(res);
      });
    });
  }

  handleRegister(username, password, captcha, captchaId) {
    return new Promise((resolve, reject) => {
      userRegister({
        username: username,
        password: password,
        captcha: captcha,
        captchaId: captchaId,
      }).then((res) => {
        if (res.state === FAILURE) {
          reject(res);
          return;
        }
        resolve(res);
      });
    });
  }

  name() {
    return this.pages[this.state.page];
  }

  otherPage() {
    return this.pages.slice().filter((cur, index) => index !== this.state.page);
  }

  otherIndex() {
    return this.pages
      .slice()
      .map((cur, index) => index)
      .filter((cur) => cur !== this.state.page);
  }

  jump(i) {
    this.setState({
      page: i,
    });
  }

  renderFragment() {
    if (this.state.page === 0)
      return (
        <div className="home">
          <h1>Welcome to Hell</h1>
          <h1>
            You have <span>{this.state.hasLogin ? "" : "not"}</span> logged in
          </h1>
        </div>
      );
    if (this.state.page === 1)
      return <Register onClick={this.handleRegister} />;
    return <Login onClick={this.handleLogin} />;
  }

  render() {
    const op = this.otherPage();
    const oi = this.otherIndex();

    return (
      <div className="app">
        <header>
          <div className="title">{this.name()}</div>
          <button className="button" onClick={() => this.jump(oi[0])}>
            {op[0]}
          </button>
          <button className="button" onClick={() => this.jump(oi[1])}>
            {op[1]}
          </button>
        </header>
        {this.renderFragment()}
      </div>
    );
  }
}

export default App;
