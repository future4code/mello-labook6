import { BaseDatabase } from "./BaseDatabase";

export class PostDatabase extends BaseDatabase {
  private static TABLE_NAME = "Post";

  public async createPost(
    post_id: string,
    user_id: string,
    title: string,
    description: string,
    createdAt: number,
    photo: string,
    type: "enum"
  ): Promise<void> {
    await this.getConnection()
      .insert({
        post_id,
        user_id,
        title,
        description,
        createdAt,
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
