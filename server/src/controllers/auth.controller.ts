import * as Express from "express";
import { generateJWTToken } from "../../src/utils/jwt";

export const handleOAuthRedirect = (
  req: Express.Request,
  res: Express.Response
) => {
  const token = generateJWTToken(req?.user?.id ?? "");

  res.send("Authed with goodle " + token);
};
