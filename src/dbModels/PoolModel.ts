
import * as mongoose from "mongoose";
import uuid = require("uuid");
import IPoolModel from "../interfaces/pool/IPoolModel";

const UserSchema = new mongoose.Schema({

    // Unieke id van de poule
    poolId: { type: String, default: uuid.v4, required: true, unique: true },

    // Naam, kan worden ingesteld door admin
    name: { type: String, required: true, maxlength: 30, minlength: 3 },

    // Users die in deze poule zitten
    userIds: { type: Array, default: [] },

    // Votes van users binnen de poule
    votesByUserId: { type: Array, default: [] },

    // Eind resultaten van de poule
    topFourCountries: { type: Array, default: [] },
    dateCreated: { type: Date, default: Date.now, required: true },

    // Laatste moment dat er nog gestemd mag worden op landen
    lastMomentToVote: { type: Number, default: -1, required: true }
});

export default mongoose.model<IPoolModel>("Pool", UserSchema);
