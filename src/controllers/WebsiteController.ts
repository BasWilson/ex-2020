import * as Express from "express";
import IController from "../interfaces/IController";
import WebsiteService from "../services/WebsiteService";

class WebsiteController implements IController {
    router: Express.Router;    
    setupRouter: () => void;
    service: WebsiteService;

    constructor() {
        this.router = Express.Router();
        this.setup();
    }

    setup = () => {
        this.service = new WebsiteService();

        this.router.get('/', this.service.SPA);
    }
}

export default new WebsiteController();