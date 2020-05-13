import * as Express from "express";
import * as jwt from "jsonwebtoken";
import { DecodeJWT } from "../helpers/UserHelpers";

export default function () {
    return (req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
        try {
            // Decode de token
            const token: any = DecodeJWT(req.cookies.token);

            // Check of de token niet null is
            if (!token) return res.sendStatus(403);

            // Laat zn gang gaan.
            else next();
        } catch (error) {
            console.log(error);
            
            // stuur forbidden
            return res.sendStatus(403);
        }

    }
}