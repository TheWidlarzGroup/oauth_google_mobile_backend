import * as nodemailer from "nodemailer";
import * as nodemailerSendgrid from "nodemailer-sendgrid";

export const transport = nodemailer.createTransport(
  nodemailerSendgrid({
    apiKey: process.env.SENDGRID_API_KEY,
  })
);
