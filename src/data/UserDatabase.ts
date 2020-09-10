import { BaseDatabase } from "./BaseDatabase";
import { CommentPostInput } from "../model/commentPostInputDTO";

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

  public async commentPost (data: CommentPostInput): Promise<void> {
    try {
      const result = await super.getConnection().raw(`
        SELECT id FROM Post WHERE id = ${data.id_post}
      `);
      
      if (result[0][0] === undefined){
        throw new Error ("Invalid Post");
      }

      await super.getConnection().raw(`
        INSERT INTO Comment VALUES ("${data.id}","${data.text}","${data.create_at.format("YYYY-MM-DD")}","${data.id_user}","${data.id_post}")
      `);
    } catch (error) {
      throw new Error (error.message);
    } finally {
      super.destroyConnection();
    }
  }
}
