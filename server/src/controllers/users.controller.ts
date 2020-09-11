import * as Express from "express";
import { getRepository } from "typeorm";
import { User } from "../entity/user.entity";

export const getUsers = async (
  _req: Express.Request,
  res: Express.Response
) => {
  try {
    console.log("trying to fetch users");

    const repo = getRepository(User);

    // const newUser = repo.create({
    //   email: "mail@mail.com",
    //   name: "JHohn DOe",
    //   password_hash: "sdiof",
    // });

    const newUser = new User();

    newUser.email = "mail.com@asd.oasd";
    newUser.name = "John DOe";
    newUser.password_hash = "sdfijsodifjoisdfj";

    await repo.save(newUser);

    console.log("users are fetched");

    // const users = await getRepository(User).find();

    res.json({
      users: [],
    });
  } catch (e) {
    console.log(e);
    res.send("get all users error");
  }
};
