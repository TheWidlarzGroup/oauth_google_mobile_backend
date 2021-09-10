import * as Express from "express";
import { generateJWTToken } from "../../src/utils/jwt";
import * as path from "path";

export const handleOAuthRedirect = (
  req: Express.Request,
  res: Express.Response
) => {
  const token = generateJWTToken(req?.user?.id ?? "");

  // res.redirect("/auth/oauth_redirect?token=" + token);
  res.redirect("/auth/oauth_redirect/" + token);
};

export const oauthRedirect = (req: Express.Request, res: Express.Response) => {
  res.status(200).type("text/html").send("");
  res.sendFile(path.join(__dirname, "../../public", "oauth_redirect.html"));
};
