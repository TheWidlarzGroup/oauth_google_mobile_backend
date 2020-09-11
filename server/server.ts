import "reflect-metadata";
import * as Express from "express";
import * as morgan from "morgan";
import * as path from "path";
import { createConnection } from "typeorm";
import UserRouter from "./src/routes/users.routes";

const app = Express();
const port = process.env.PORT || 7004;

createConnection({
  type: "postgres",
  host: "db", // name of docker-composes service
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  synchronize: process.env.MODE === "dev", // should be off in prod
  logging: process.env.MODE === "dev",
  entities: [path.join(__dirname, "src", "entity", "**", "*.entity.{ts,js}")],
  migrations: ["./src/migration/**/*.{ts,js}"],
  subscribers: ["./src/subscriber/**/*.{ts,js}"],
})
  .then((conn) => {
    console.log("Connected with DB");
    console.log("Is connected: ", conn.isConnected);
  })
  .catch((reason) => {
    console.log("Error while connecting with db");
    console.log(reason);
  });

app.use(
  "/.well-known",
  Express.static(path.join(__dirname, "../public"), {
    setHeaders: (res) => {
      res.type("application/json");
      // res.type("application/pkcs7-mime");
    },
  })
);

if (process.env.MODE === "dev") {
  app.use(morgan("tiny"));
}

app.use("/api/users", UserRouter);

app.get("/student_oauth_redirect", (req, res) => {
  // res.sendFile(path.join(__dirname, "../public", "test.html"));
  res.status(200).send("");
});

app.get("/", (_: Express.Request, res: Express.Response) => {
  res.sendFile(path.join(__dirname, "../public", "index.html"));
});

app.listen(port, () => {
  console.log("MODE: ", process.env.MODE);
  console.log("Server run on port: with AASA file ", port);
});
