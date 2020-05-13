import * as Express from "express";
import { DecodeJWT } from "../helpers/UserHelpers";

/**
 * Checkt of de gebruiker is ingelogd en of de gebruiker een admin is 
 */
export default function () {
    return (req: Express.Request, res: Express.Response, next: Express.NextFunction) => {

        // Decode de JWT
        const token: any = DecodeJWT(req.cookies.token);

        // Geen token? Forbidden!
        if (!token) return res.sendStatus(403);

        // elevation level is niet op gebruikers level
        if (token.payload.elevationLevel > 0) {
            next();
        } else {
            // Geen admin? Forbidden!
            res.sendStatus(403);
        }
    }
}