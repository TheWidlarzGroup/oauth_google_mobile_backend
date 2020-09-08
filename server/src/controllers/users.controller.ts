import * as Express from "express";
import { getRepository } from "typeorm";
import { User } from "../entity/user.entity";

export const getUsers = async (req: Express.Request, res: Express.Response) => {
  try {
    console.log("trying to fetch users");
    const users = await getRepository(User).find();

    console.log("users are fetched");

    res.json({
      users,
    });
  } catch (e) {
    console.log(e);
    res.send("get all users error");
  }
};
