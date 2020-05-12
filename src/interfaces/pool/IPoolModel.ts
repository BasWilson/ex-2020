import { Document } from "mongoose";

export default interface IPoolModel extends Document {
    poolId: string;
    name: string;
    userIds: string[];
    dateCreated: string;
    votesByUserId: [
        {
            userId: string;
            votesInOrderByCountry: string[];
        }
    ]
}