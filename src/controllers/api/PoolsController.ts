import * as Express from "express";
import IController from "../../interfaces/IController";
import PoolService from "../../services/api/PoolService";
import AdminCheck from "../../middleware/AdminCheck";
import LoggedInCheck from "../../middleware/LoggedInCheck";

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
        this.router.post('/', AdminCheck(), this.service.Create);

        // Haal een of alle poules op
        this.router.get('/:poolId?', LoggedInCheck(), this.service.GetPool);

        // Update een pool
        this.router.put('/', AdminCheck(), this.service.Update);

        // Update een pool
        this.router.put('/pick-countries', LoggedInCheck(), this.service.PickCountries);
    }
}

export default new PoolController();