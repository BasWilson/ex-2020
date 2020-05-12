import * as Express from "express";
import IController from "../../interfaces/IController";
import PoolService from "../../services/api/PoolService";
import AdminCheck from "../../middleware/AdminCheck";

class PoolController implements IController {
    router: Express.Router;    
    setupRouter: () => void;
    service: PoolService;

    constructor() {
        this.router = Express.Router();
        this.setup();
    }

    setup = () => {
        this.service = new PoolService();

        // Handeld het creeeren van een user
        this.router.post('/create', AdminCheck(), this.service.Create);
    }
}

export default new PoolController();