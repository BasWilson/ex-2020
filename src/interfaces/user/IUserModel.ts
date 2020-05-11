import ISession from "./ISession";
import { Document } from "mongoose";

export default interface IUserModel extends Document {
    userId: string;
    elevationLevel: number;
    username: string;
    password: string;
    pouleIds: string[];
    sessions: ISession[];
    dateJoined: number;
}