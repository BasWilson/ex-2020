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

        // Handeld het creeeren van een user
        this.router.post('/create', this.service.Create);

        // Handeld het inloggen van een user
        this.router.post('/login', this.service.LogIn);
    }
}

export default new UsersController();