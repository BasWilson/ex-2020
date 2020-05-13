import * as Express from "express";
import IController from "../../interfaces/IController";
import UsersService from "../../services/api/UsersService";
import LoggedInCheck from "../../middleware/LoggedInCheck";

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

        // Handeld het uitloggen van een user
        this.router.post('/logout', LoggedInCheck(), this.service.Logout);

        // Haalt alle users op, checkt ook of gebruiker ingelogd is
        this.router.get('/:userId?', LoggedInCheck(), this.service.GetUser);
    }
}

export default new UsersController();