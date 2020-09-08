import * as Express from "express";

export const getUsers = async (req: Express.Request, res: Express.Response) => {
  try {
    res.send("get all users");
  } catch (e) {
    res.send("get all users error");
  }
};
