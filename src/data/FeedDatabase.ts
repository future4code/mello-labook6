import { BaseDatabase } from "./BaseDatabase";
import { FeedDTO } from "../model/feedDTO";

export class FeedDatabase extends BaseDatabase {

    public async feed (id: string): Promise<FeedDTO> {
        try {
          const result = await super.getConnection().raw(`
                  SELECT Post.id, text, create_at, id_user, type, name FROM Post
                  JOIN User ON User.id = Post.id_user
                  JOIN Followers ON Followers.idUser = User.id
                  WHERE Followers.idFollower = "${id}"
                  ORDER BY Post.create_at DESC;
          `);
          const isResult: FeedDTO = result[0].map((item:any) => {
              return {
                postId: item.id,
                text: item.text,
                create_at: item.create_at,
                id_user: item.id_user,
                type: item.type,
                name: item.name
              }
          })
          return isResult;
        } catch (error) {
          throw new Error (error.message)
        } finally {
          await super.destroyConnection();
        }
    }

    public async getFeed (role: string): Promise<any> {
        const result = await this.getConnection().raw(`
        SELECT * FROM Post 
        WHERE role = "${role}"; 
        `);
        return result[0]
    }

}