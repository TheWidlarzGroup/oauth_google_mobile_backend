import * as Express from "express";
import * as morgan from "morgan";

const app = Express();
const port = process.env.PORT || 7000;

if (process.env.MODE === "dev") {
  app.use(morgan("tiny"));
}

app.get("/", (_: Express.Request, res: Express.Response) => {
  res.send("Hello world");
});

app.listen(port, () => {
  console.log("MODE: ", process.env.MODE);
  console.log("Server run on port: ", port);
});
