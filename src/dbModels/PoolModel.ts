
import * as mongoose from "mongoose";
import uuid = require("uuid");
import IPoolModel from "../interfaces/pool/IPoolModel";


const UserSchema = new mongoose.Schema({
    poolId: { type: String, default: uuid.v4, required: true, unique: true },
    name: { type: String, required: true, maxlength: 30, minlength: 3 },
    userIds: { type: Array, default: [] },
    votesByUserId: { type: Array, default: [] },
    dateCreated: { type: Date, default: Date.now, required: true }
});

export default mongoose.model<IPoolModel>("Pool", UserSchema);
