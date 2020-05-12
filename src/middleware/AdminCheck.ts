import * as Express from "express";
import * as jwt from "jsonwebtoken";
import { DecodeJWT } from "../helpers/UserHelpers";

export default function () {
    return (req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
        const token: any = DecodeJWT(req.cookies.token);

        if (!token) return res.sendStatus(403);

        if (token.payload.elevationLevel > 0) {
            next();
        } else {
            res.sendStatus(403);
        }
    }
}