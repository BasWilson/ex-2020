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

        // Handeld het creeren van een pool, checkt ook voor admin level.
        this.router.post('/create', AdminCheck(), this.service.Create);

        // Haal alle poules op
        this.router.get('/', AdminCheck(), this.service.GetAllPools);
    }
}

export default new PoolController();