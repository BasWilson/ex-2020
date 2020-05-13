import { Document } from "mongoose";

export default interface IUserModel extends Document {
    userId: string;
    elevationLevel: number;
    username: string;
    password: string;
    pouleIds: string[];
    dateJoined: number;
}