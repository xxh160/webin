import { PORT } from "./src/config.js";
import Express from "express";
import user from "./src/api/user.js";

const app = Express();

// cross
app.all("*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});

const router = Express.Router();
router.use("/user", user);

// for parsing application/json
app.use(Express.json());
// for parsing application/x-www-form-urlencoded
app.use(Express.urlencoded({ extended: true }));
app.use("/api", router);

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
