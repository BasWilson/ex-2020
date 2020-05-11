import * as Express from "express";
import * as path from "path";

export default class UsersService {
    
    public users = (req: Express.Request, res: Express.Response) => {
        res.send("Hello")
    }
}