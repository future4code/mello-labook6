import { Request, Response } from 'express';
import { Authenticator } from '../services/Authenticator';
import { UserDatabase } from '../data/UserDatabase';

export async function feed (req: Request, res: Response) {
    try {
        const authenticator = new Authenticator();
        const user = new UserDatabase();
        const token = req.headers.authorization as string;
        const data = authenticator.getData(token);
        const result = await user.feed(data.id);
        
        res.status(200).send({
            result: result[0]
        });
    } catch (error) {
        res.status(401).send({
            message: error.message
        });
    }
}