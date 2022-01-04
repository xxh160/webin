import React from "react";
import { getCaptcha } from "../apis/user";
import { SUCCESS } from "./constant";

export function buildFormC(TargetComponent) {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.refreshCaptcha = this.refreshCaptcha.bind(this);
      this.handleUsername = this.handleUsername.bind(this);
      this.handlePassword = this.handlePassword.bind(this);
      this.handleCaptcha = this.handleCaptcha.bind(this);
      this.handleClick = this.handleClick.bind(this);
      this.handleWrong = this.handleWrong.bind(this);
      this.handleSuccess = this.handleSuccess.bind(this);
      this.state = {
        username: null,
        password: null,
        captcha: null,
        captchaId: null,
        captchaSrc: null,
        wrong: false,
        success: false,
        msg: null,
      };
    }

    componentDidMount() {
      this.refreshCaptcha();
    }

    refreshCaptcha() {
      getCaptcha().then((res) => {
        if (res.state === SUCCESS) {
          console.log(res);
          this.setState({
            captchaSrc: { __html: res.data.src },
            captchaId: res.data.id,
          });
        }
      });
    }

    handleUsername(e) {
      this.setState({ username: e.target.value });
    }

    handlePassword(e) {
      this.setState({ password: e.target.value });
    }

    handleCaptcha(e) {
      this.setState({ captcha: e.target.value });
    }

    handleClick() {
      if (this.state.password === null || this.state.username === null) {
        this.handleWrong("Lacking password/username");
        return;
      }
      if (this.state.captcha === null) {
        this.handleWrong("Lacking captcha");
        return;
      }

      // 这里应该把 handle 下放给 wrapped 组件
      this.props
        .onClick(
          this.state.username,
          this.state.password,
          this.state.captcha,
          this.state.captchaId
        )
        .then((res) => this.handleSuccess(res.msg))
        .catch((res) => this.handleWrong(res.msg));

      this.refreshCaptcha();
    }

    handleWrong(msg) {
      this.setState({ wrong: true, msg: msg });
      setTimeout(() => this.setState({ wrong: false, msg: null }), 2000);
    }

    handleSuccess(msg) {
      this.setState({ success: true, msg: msg });
      setTimeout(() => this.setState({ success: false, msg: null }), 2000);
    }

    render() {
      return (
        <TargetComponent
          {...this.state}
          handleUsername={this.handleUsername}
          handlePassword={this.handlePassword}
          handleCaptcha={this.handleCaptcha}
          handleClick={this.handleClick}
          handleWrong={this.handleWrong}
        />
      );
    }
  };
}
