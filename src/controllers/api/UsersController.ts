import * as Express from "express";
import IController from "../../interfaces/IController";
import UsersService from "../../services/api/UsersService";

class UsersController implements IController {
    router: Express.Router;    
    setupRouter: () => void;
    service: UsersService;

    constructor() {
        this.router = Express.Router();
        this.setup();
    }

    setup = () => {
        this.service = new UsersService();

        this.router.get('/', this.service.users);
    }
}

export default new UsersController();