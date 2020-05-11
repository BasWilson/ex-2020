import * as Express from "express";
import * as path from "path";
import * as mongoose from "mongoose";
import * as config from "../../config.json";
import WebsiteController from "../controllers/WebsiteController";

export default class WebServer {

    app: Express.Application;

    constructor() {

        // Maak een nieuwe express app
        this.app = Express();
        
        // Stel de controllers in
        this.SetupControllers();

        // Maak de client files beschikbaar binnen de http-server
        this.app.use('/', Express.static(path.join(__dirname, '../client/dev-dist')))

        // Start de http-server op port 80
        this.app.listen(80);

        // Connect met mongo
        this.ConnectToDatabase();
    }

    /**
     * Binnen deze functie worden alle controllers(routes) aan de Express app toegevoegd.
     */
    private SetupControllers = () => {

        // De route die de website served
        this.app.use("/", WebsiteController.router);
    };

    private ConnectToDatabase = async () => {
        
        // connect met de mongo database aan de hand van config.json
        await mongoose.connect(`mongodb+srv://${config.mongoUserName}:${config.mongoPassword}@${config.mongoUrl}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
        });
    }

}
