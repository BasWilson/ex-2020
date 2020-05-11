import * as Express from "express";
import * as path from "path";

export default class WebsiteService {
    
    public SPA = (req: Express.Request, res: Express.Response) => {
        res.sendFile(path.join(__dirname + "/../client/dev-dist/" + '/index.html'));
    }
}