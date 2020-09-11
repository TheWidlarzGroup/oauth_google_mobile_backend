import * as Express from "express";
import * as morgan from "morgan";
import * as path from "path";

const app = Express();
const port = process.env.PORT || 7004;

app.use(
  "/.well-known",
  Express.static(path.join(__dirname, "../public"), {
    setHeaders: (res) => {
      res.type("application/json");
    },
  })
);

if (process.env.MODE === "dev") {
  app.use(morgan("tiny"));
}

app.get("/student_oauth_redirect", (req, res) => {
  // res.sendFile(path.join(__dirname, "../public", "test.html"));
  res.status(200).send("")
});

app.get("/", (_: Express.Request, res: Express.Response) => {
  // res.send("Hello world");
  res.sendFile(path.join(__dirname, "../public", "index.html"));
});

app.listen(port, () => {
  console.log("MODE: ", process.env.MODE);
  console.log("Server run on port: with AASA file ", port);
});
