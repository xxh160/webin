import mysql from "mysql";
import { DATABASE, HOST, PASSWORD, USER } from "../config.js";

const connection = mysql.createConnection({
  host: HOST,
  user: USER,
  password: PASSWORD,
  database: DATABASE,
});
connection.connect();

export default connection;
