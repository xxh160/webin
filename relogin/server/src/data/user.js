import connection from "./db.js";

const user_db = "user_info";

export function getUser(username) {
  return new Promise((resolve, reject) => {
    connection.query(
      `select * from ${user_db} where username='${username}' limit 1`,
      (err, user) => {
        console.log(err);
        console.log(user);
        if (err) {
          reject(err);
          return;
        }
        resolve(user);
      }
    );
  });
}

export function addUser(username, password, salt) {
  connection.query(
    `insert into ${user_db} (username, password, salt) value ('${username}', '${password}', '${salt}')`
  );
}
