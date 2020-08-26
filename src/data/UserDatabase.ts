import { BaseDatabase } from "./BaseDatabase";


export class UserDatabase extends BaseDatabase {

  private static TABLE_NAME = "Users";

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

  public async feed (id: string): Promise<any> {
    try {
      const result = await super.getConnection().raw(`
              SELECT Post.id, text, create_at, id_user, type, name FROM Post
              JOIN Users ON Users.id = Post.id_user
              JOIN Followers ON Followers.idUser = Users.id
              WHERE Followers.idFollower = "${id}"
              ORDER BY Post.create_at DESC;
      `);
      return result;
    } catch (error) {
      throw new Error (error.message)
    } finally {
      await super.destroyConnection();
    }
  }

 

}
