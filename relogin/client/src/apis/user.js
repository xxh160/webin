import axios, { userAPI } from "./config.js";

export const userRegister = (info) => {
  const { username, password, captcha, captchaId } = info;
  console.log(username);
  return axios
    .post(`${userAPI}/register`, { username, password, captcha, captchaId })
    .then((res) => {
      return res.data;
    });
};

export const userLogin = (info) => {
  const { username, password, captcha, captchaId } = info;
  return axios
    .post(`${userAPI}/login`, { username, password, captcha, captchaId })
    .then((res) => {
      return res.data;
    });
};

export const getCaptcha = () => {
  return axios.get(`${userAPI}/captcha`).then((res) => {
    return res.data;
  });
};
