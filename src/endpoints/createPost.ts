import { Request, Response } from "express";
import { BaseDatabase } from "../data/BaseDatabase";
import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";
import { PostDatabase } from "../data/PostDatabase";
import { title } from "process";

export const createPost = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization as string;
    const authenticator = new Authenticator();
    const AuthenticationData = authenticator.verify(token);
    const userId = AuthenticationData.id;

    const idGenerator = new IdGenerator();
    const postId = IdGenerator.generateId();

    const { photo, description, type } = req.body;
    const creationDate = Date.now();

    const postDatabase = new PostDatabase();
    await postDatabase.createPost(
      postId,
      userId,
      title,
      description,
      createdAt,
      photo,
      type
    );
    res.status(200).send({
      message: "Post criado com sucesso",
    });
  } catch (e) {
    res.status(400).send({
      message: e.message,
    });
  }
  BaseDatabase.destroyConnection();
};
