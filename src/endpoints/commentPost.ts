import { Request, Response } from 'express';
import { Authenticator } from '../services/Authenticator';
import { UserDatabase } from '../data/UserDatabase';
import { CommentPostInput } from '../model/commentPostInputDTO';
import { IdGenerator } from '../services/IdGenerator';
import moment from 'moment';

export async function commentPost(req: Request, res: Response) {
    try {
        if(!req.headers.authorization) {
            throw new Error ("Invalid Token");
        }
        const authenticator = new Authenticator();
        const user = new UserDatabase();
        const idGenerator = new IdGenerator().generateId();
        const token = authenticator.getData(req.headers.authorization as string);

        const data: CommentPostInput = {
            id: idGenerator,
            text: req.body.text,
            create_at: moment(),
            id_user: token.id,
            id_post: req.params.id
        }

        await user.commentPost(data);

        res.status(200).send({
            message: "Post criado!"
        })
    } catch (error) {
        res.status(400).send({
            message: error.message
        })
    }
}