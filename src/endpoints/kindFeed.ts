import{ Request, Response } from "express";
import { Authenticator } from "../services/Authenticator";
import { FeedDatabase } from "../data/FeedDatabase";



export const kindFeed = async (req: Request, res: Response) => {

    try {
        const token = req.headers.authorization as string;
        const authenticator = new Authenticator();
        const authenticationData = authenticator.verify(token);
        const userId = authenticationData.id;

        const feedDatabase = new FeedDatabase();
        const feed = await feedDatabase.getFeed(userId);
        
        res.status(200).send(feed);
        
    } catch (error) {
        res.status(400).send({message: error.message})
        
    }

}