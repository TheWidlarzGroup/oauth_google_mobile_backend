import * as Express from "express";
import { generateJWTToken } from "../../src/utils/jwt";
import * as path from "path";
import * as Mailer from "../services/mailer";

export const handleOAuthRedirect = (
  req: Express.Request,
  res: Express.Response
) => {
  const { id: userId, email } = req?.user || { id: "", email: "" };
  const token = generateJWTToken(userId);

  if (email) {
    Mailer.sendAccountConfirmationEmail(email);
  }

  res.redirect("/auth/oauth_redirect/" + token);
};

export const oauthRedirect = (req: Express.Request, res: Express.Response) => {
  res.setHeader("Content-Security-Policy", "script-src 'unsafe-inline';");
  res.setHeader("Content-Type", "text/html");
  res.sendFile(path.join(__dirname, "../../../public", "oauth_redirect.html"));
};
