import { BaseDatabase } from "./BaseDatabase";
import { FeedDTO } from "../model/feedDTO";


export class UserDatabase extends BaseDatabase {

  private static TABLE_NAME: string = "User";

  public async registerUser(id: string, username: string, email: string, password: string): Promise<void> {
    await this.getConnection()
      .insert({id, username, email, password }).into(UserDatabase.TABLE_NAME);
  }

  public async signIn (email: string): Promise<any> {
    try {
      const result = await super.getConnection().raw(`
        SELECT * FROM ${UserDatabase.TABLE_NAME} WHERE email = "${email}"
      `);
      return result;
    } catch (error) {
      throw new Error (error.message)
    } finally {
      super.destroyConnection();
    }
  }

  public async feed (id: string): Promise<FeedDTO> {
    try {
      const result = await super.getConnection().raw(`
              SELECT Post.id, text, create_at, id_user, type, name FROM Post
              JOIN User ON Users.id = Post.id_user
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

}
