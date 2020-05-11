
import * as mongoose from "mongoose";
import IUserModel from "../interfaces/user/IUserModel";
import uuid = require("uuid");
import { GenerateBcryptHash } from "../helpers/UserHelpers";


const UserSchema = new mongoose.Schema({
    userId: { type: String, default: uuid.v4, required: true },
    password: {type: String, required: true },
    pouleIds: {type: Array, default: []},
    sessions: { type: Array, default: []}
});

UserSchema.pre('save', async function (next) {
    let user: any = this;
    try {

        // Check of het wacthwoord is aangepast.
        if (!user.isModified('password')) return next();

        // Genereer de bcrypt hash voor het wachtwoord
        const hash = await GenerateBcryptHash(user.profile.password);
        user.password = hash;

        return next();
    } catch (error) {
        return next(error);
    }
});

export default mongoose.model<IUserModel>("User", UserSchema);