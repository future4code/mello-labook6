import { Request, Response } from 'express';
import { UserDatabase } from '../data/UserDatabase';
import { Authenticator } from '../services/Authenticator';
import { HashManager } from '../services/HashManager';
import { loginDTO } from '../model/loginDTO';

export async function login (req: Request, res: Response) {
    try {
        const user = new UserDatabase();
        const hashManager = new HashManager();
        const authenticator = new Authenticator();
        const email = req.body.email;
        const password = req.body.password;

        if (!password) {
            throw new Error ("Invalid Email or Password");
        }

        const result = await user.signIn(email);
        const isPassword = hashManager.compare(password, result[0][0].id);

        if(!isPassword){
            throw new Error ("Invalid Email or Password");
        }

        const token: loginDTO = {token: authenticator.generateToken({id: result[0][0].id})};

        res.status(200).send(token);
    } catch (error) {
        res.status(400).send({
            message: error.message
        })
    }
}