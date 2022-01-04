import React from "react";
import { buildFormC } from "../utils/hoc.js";
import { checkStrength } from "../utils/password.js";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.handleConfirm = this.handleConfirm.bind(this);
    this.submit = this.submit.bind(this);
    this.state = {
      confirm: "",
    };
  }

  handleConfirm(e) {
    this.setState({ confirm: e.target.value });
  }

  submit() {
    if (this.state.confirm !== this.props.password) {
      this.props.handleWrong(null);
      return;
    }
    this.props.handleClick();
  }

  strengthTip() {
    if (this.props.password === null) return null;
    let colors = ["#00CC00", "orange", "red"];
    let tips = ["low", "medium", "high"];
    let lv = checkStrength(this.props.password) - 1;
    console.log(lv);
    return (
      <p>
        Password strength: <span style={{ color: colors[lv] }}>{tips[lv]}</span>
      </p>
    );
  }

  render() {
    return (
      <div className="form">
        <h1 style={this.props.wrong ? { color: "red" } : { display: "none" }}>
          {this.props.msg !== null ? this.props.msg : "Passwords not match"}
        </h1>
        <h1
          style={
            this.props.success ? { color: "#00CC00" } : { display: "none" }
          }
        >
          {this.props.msg !== null
            ? this.props.msg
            : "Register succeeded, Plz log in"}
        </h1>
        <h1
          style={
            this.props.wrong || this.props.success ? { display: "none" } : null
          }
        >
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
          type="password"
          placeholder="confirm your passwd"
          onChange={this.handleConfirm}
        />
        {this.strengthTip()}
        <input
          type="text"
          placeholder="verification code"
          onChange={this.props.handleCaptcha}
        />
        <div dangerouslySetInnerHTML={this.props.captchaSrc} />
        <button className="button" onClick={this.submit}>
          sign up
        </button>
      </div>
    );
  }
}

export default buildFormC(Register);
