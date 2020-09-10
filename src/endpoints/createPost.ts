import { Request, Response } from "express";
import { BaseDatabase } from "../data/BaseDatabase";
import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";
import { PostDatabase } from "../data/PostDatabase";
import { title } from "process";
import { createPostInputDTO } from "../model/postDTO";

export const createPost = async (req: Request, res: Response) => {
  try {
    const { photo, description, type } = req.body;
    if (!photo || !description || !type) {
      throw new Error("photo, description and type are required");
    }
    if (type !== "NORMAL" && type !== "EVENT") {
      throw new Error("type must be either NORMAL or EVENT");
    }
    const token = req.headers.authorization as string;
    if (!token) {
      throw new Error("missing token");
    }
    const authenticator = new Authenticator();
    const AuthenticationData = authenticator.verify(token);
    const userId = AuthenticationData.id;
    //To do criar metodo de buscar id para validar userId
    const idGenerator = new IdGenerator();
    const postId = idGenerator.generateId();
    const createdAt = new Date();
    const input: createPostInputDTO = {
      description,
      photo,
      type,
      createdAt,
      postId,
      userId,
    };

    const postDatabase = new PostDatabase();
    await postDatabase.createPost(input);

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
