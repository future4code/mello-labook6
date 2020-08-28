import { BaseDatabase } from "./BaseDatabase";


export class FeedDatabase extends BaseDatabase {

    public async getFeed (role: string): Promise<any> {
        const result = await this.getConnection().raw(`
        SELECT * FROM Post 
        WHERE role = "${role}"; 
        `);
        return result[0]
    }

}