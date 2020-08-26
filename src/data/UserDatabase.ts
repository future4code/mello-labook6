import { BaseDatabase } from "./BaseDatabase";


export class UserDatabase extends BaseDatabase {

  private static TABLE_NAME: string = "User";

  public async registerUser(id: string, username: string, email: string, password: string): Promise<void> {
    await this.getConnection()
      .insert({id, username, email, password }).into(UserDatabase.TABLE_NAME);
  }

}
