import { BaseDatabase } from "./BaseDatabase";
import { createPostInputDTO } from "../model/postDTO";

export class PostDatabase extends BaseDatabase {
  private static TABLE_NAME = "Labook_Posts";

  public async createPost(input: createPostInputDTO): Promise<void> {
    const {
      postId: post_id,
      userId: user_id,
      description,
      createdAt: created_at,
      photo,
      type,
    } = input;
    await this.getConnection()
      .insert({
        post_id,
        user_id,
        description,
        created_at,
        photo,
        type,
      })
      .into(PostDatabase.TABLE_NAME);
  }

  public async getPostById(postId: string): Promise<any> {
    const result = await this.getConnection()
      .select("*")
      .from(PostDatabase.TABLE_NAME)
      .where({ post_id: postId });
    return result[0];
  }
}
