
import * as mongoose from "mongoose";
import IUserModel from "../interfaces/user/IUserModel";
import uuid = require("uuid");
import { GenerateBcryptHash } from "../helpers/UserHelpers";

// Define het schema voor de user
const UserSchema = new mongoose.Schema({
    // User id van de user, uuidv4. Moet uniek zijn.
    userId: { type: String, default: uuid.v4, required: true, unique: true },

    // Boven level 0 zijn er admin permissions.
    elevationLevel: { type: Number, default: 0, required: true },

    // Unique username, kan ingesteld worden bij het maken van acc
    username: { type: String, required: true, maxlength: 30, minlength: 3, unique: true },

    // Wachtwoord
    password: { type: String, required: true },

    // Poules waar we in zitten
    pouleIds: { type: Array, default: [] },

    // Datum dat we gejoined zijn
    dateJoined: { type: Date, default: Date.now, required: true }
});

// Hook in de save functie van mongo zodat we wat logic kunnen uitvoeren voordat het saved.
UserSchema.pre('save', async function (next) {
    let user: any = this;
    try {

        // Check of het wacthwoord is aangepast.
        if (!user.isModified('password')) return next();

        // Genereer de bcrypt hash voor het wachtwoord
        const hash = await GenerateBcryptHash(user.password);
        user.password = hash;

        return next();
    } catch (error) {
        return next(error);
    }
});

export default mongoose.model<IUserModel>("User", UserSchema);
