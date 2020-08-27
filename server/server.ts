require("dotenv").config();

import * as Express from "express";

const app = Express();
const port = process.env.PORT || 7000;

app.get("/", (_: Express.Request, res: Express.Response) => {
  res.send("Hello world");
});

app.listen(port, () => {
  console.log("MODE: ", process.env.MODE);
  console.log("Server run on port: ", port);
});
