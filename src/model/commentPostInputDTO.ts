import moment from 'moment';

export interface CommentPostInput {
    id: string,
    text: string,
    create_at: moment.Moment,
    id_user: string,
    id_post: string
}