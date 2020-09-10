import{ Request, Response } from "express";
import { IdGenerator } from "../services/IdGenerator";
import { HashManager } from "../services/HashManager";
import { UserDatabase } from "../data/UserDatabase";
import { Authenticator } from "../services/Authenticator";

export const signUp = async (req: Request, res: Response) => {
    try {
        const username = req.body.username;
        const email = req.body.email;
        const password = req.body.password;

        if(!username || !email || !password) {
            throw new Error("Insert all informations required")
        }

        const idGenerator = new IdGenerator();
        const id = idGenerator.generateId();

        const hashManager = new HashManager();
        const hashPassword = await hashManager.hash(password);

        const userDatabase = new UserDatabase();
        await userDatabase.registerUser(
            id,
            username,
            email, 
            hashPassword   
        );

        const authenticator = new Authenticator(); 
        const token = authenticator.generateToken({id});

        res.status(200).send({message: "User created succesfully", token})


    } catch (error) {
        res.status(400).send({message: error.message})
    }
};
