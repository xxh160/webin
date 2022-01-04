import axios from "axios";

const server = "/api";
export const userAPI = `${server}/user`;

export default axios.create({
  baseURL: "http://localhost:8000/",
  responseType: "json",
});
