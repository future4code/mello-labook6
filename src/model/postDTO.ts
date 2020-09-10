export interface createPostInputDTO {
  type: POST_TYPE;
  description: string;
  photo: string;
  postId: string;
  createdAt: Date;
  userId: string;
}

export enum POST_TYPE {
  NORMAL = "NORMAL",
  EVENT = "EVENT",
}
