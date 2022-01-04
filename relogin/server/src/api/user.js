import Express from "express";
import captcha from "svg-captcha";
import {
  encrypt,
  randomStr,
  symmetricDecrypt,
  symmetricEncrypt,
} from "../util/crypt.js";
import { FAILURE, SUCCESS } from "../util/constant.js";
import { addUser, getUser } from "../data/user.js";

const user = Express.Router();

user.get("/captcha", function (req, res) {
  const codeConfig = {
    size: 4,
    ignoreChars: "0o1i",
    noise: 1,
    color: true,
    background: "#cc9966",
  };
  const cur = captcha.create(codeConfig);
  const text = cur.text.toLowerCase();
  const src = cur.data;
  res.send({
    state: SUCCESS,
    msg: "success",
    data: { id: symmetricEncrypt(text), src: src },
  });
});

user.post("/login", function (req, res) {
  let captchaId = symmetricDecrypt(req.body.captchaId);
  if (captchaId !== req.body.captcha.toLowerCase()) {
    res.send({ state: FAILURE, msg: "Wrong captcha" });
    return;
  }

  getUser(req.body.username).then((userInfo) => {
    if (userInfo.length === 0) {
      res.send({ state: FAILURE, msg: "Wrong username" });
      return;
    }
    let cur = userInfo[0];
    const pwd = encrypt(req.body.password, cur.salt);
    if (cur.password !== pwd) {
      res.send({ state: FAILURE, msg: "Wrong password" });
      return;
    }
    res.send({ state: SUCCESS, msg: "Login succeeded" });
  });
});

user.post("/register", function (req, res) {
  let captchaId = symmetricDecrypt(req.body.captchaId);
  if (captchaId !== req.body.captcha.toLowerCase()) {
    res.send({ state: FAILURE, msg: "Wrong captcha" });
    return;
  }

  getUser(req.body.username).then((userInfo) => {
    if (userInfo.length !== 0) {
      res.send({ state: FAILURE, msg: "Username has been used" });
      return;
    }
    const salt = randomStr(20);
    const pwd = encrypt(req.body.password, salt);
    addUser(req.body.username, pwd, salt);
    res.send({ state: true, msg: "Register succeeded" });
  });
});

export default user;
