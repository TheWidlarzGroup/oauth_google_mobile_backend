import * as Express from "express";
import { generateJWTToken } from "../../src/utils/jwt";
import * as path from "path";

export const handleOAuthRedirect = (
  req: Express.Request,
  res: Express.Response
) => {
  try {
    const token = generateJWTToken(req?.user?.id ?? "");

    res.redirect("/auth/oauth_redirect/" + token);
  } catch (e) {
    console.log("error in handleOAuthRedirect");
    console.log(e);

    res.redirect("/auth/oauth_redirect/" + "errorToken");
  }
};

export const oauthRedirect = (req: Express.Request, res: Express.Response) => {
  res.setHeader("Content-Security-Policy", "script-src 'unsafe-inline';");
  res.setHeader("Content-Type", "text/html");
  res.sendFile(path.join(__dirname, "../../../public", "oauth_redirect.html"));
};
