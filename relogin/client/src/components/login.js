import React from "react";
import { buildFormC } from "../utils/hoc.js";

class Login extends React.Component {
  render() {
    return (
      <div className="form">
        <h1 style={this.props.wrong ? { color: "red" } : { display: "none" }}>
          {this.props.msg !== null ? this.props.msg : "Wrong username/password"}
        </h1>
        <h1 style={this.props.wrong ? { display: "none" } : null}>
          Welcome to Hell
        </h1>
        <input
          type="text"
          placeholder="username"
          onChange={this.props.handleUsername}
        />
        <input
          type="password"
          placeholder="password"
          onChange={this.props.handlePassword}
        />
        <input
          type="text"
          placeholder="verification code"
          onChange={this.props.handleCaptcha}
        />
        <div dangerouslySetInnerHTML={this.props.captchaSrc} />
        <button className="button" onClick={this.props.handleClick}>
          sign in
        </button>
      </div>
    );
  }
}

export default buildFormC(Login);
