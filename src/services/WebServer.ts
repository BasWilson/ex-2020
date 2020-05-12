import * as Express from "express";
import * as session from "express-session";
import * as path from "path";
import * as mongoose from "mongoose";
import * as config from "../../config.json";
import * as moment from 'moment';
var cookieParser = require('cookie-parser')
import bodyParser = require("body-parser");
import WebsiteController from "../controllers/WebsiteController";
import UsersController from "../controllers/api/UsersController";
import PoolsController from "../controllers/api/PoolsController";

export default class WebServer {

    app: Express.Application;

    constructor() {

        // Maak een nieuwe express app
        this.app = Express();

        // Voeg benodigde middleware toe
        this.app.use(bodyParser());
        this.app.use(cookieParser());
        this.app.use(session({
            secret: config.sessionSecret,
            resave: false,
            saveUninitialized: true,
            cookie: {
                expires: moment().add(1, 'w').toDate(),
                httpOnly: true,
                secure: false,
                signed: true,
            }
          }))

        // Maak de client files beschikbaar binnen de http-server
        this.app.use('/', Express.static(path.join(__dirname, '../client/dev-dist')));

        // Stel de controllers in
        this.SetupControllers();

        // Start de http-server op port 80
        this.app.listen(80);

        // Connect met mongo
        this.ConnectToDatabase();
    }

    /**
     * Binnen deze functie worden alle controllers(routes) aan de Express app toegevoegd.
     */
    private SetupControllers = () => {

        // Api router, alle api routes moeten onder deze route aangemaakt worden
        const api = Express.Router();

        api.use("/users", UsersController.router);

        api.use("/pool", PoolsController.router);

        // Voeg de api toe
        this.app.use("/api", api);

        // De route die de website served. Belangrijk! Plaats altijd als laatste omdat deze een wildcard heeft en alle volgende routes overschrijft.
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
