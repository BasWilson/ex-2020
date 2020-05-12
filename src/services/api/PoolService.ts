import * as Express from "express";
import * as striptags from "striptags";
import IReq from "../../interfaces/user/IReq";
import IPoolModel from "../../interfaces/pool/IPoolModel";
import PoolModel from "../../dbModels/PoolModel";

export default class PoolService {
    
    /**
     * Valideert input en creeert een gebruiker.
     */
    public Create = async (req: IReq, res: Express.Response) => {

        try {

            // Valideer de input
            // Check if username en password zijn mee gegeven
            if (!req.body.hasOwnProperty("name")) {

                return res.send({
                    error: "noPoolNameSupplied"
                });
            }

            // Data is er. Strip data van harmfull stuff
            let {name, userIds} = req.body;

            // Strip HTML tags uit de naam en haal whitespace weg
            name = striptags(name).trim();

            // Check lengte van de naam
            if (name.length > 30 || name.length < 3) {

                return res.send({
                    error: "usernameLengthInvalid"
                });
            }

            // Creeer de poule
            const pool = <IPoolModel>{
                name: name,
                userIds: userIds
            };

            // Sla de poule op in de database
            const savedPoule = await PoolModel.create(pool);
            
            // Stuur true terug naar de admin
            res.send(true);

        } catch (error) {
            console.log("Error tijdens het maken van poule", error);

            // Check of het een mongo error is
            if (error.hasOwnProperty("code")) {

                // Duplicate key error == username is al ingebruik
                if (error.code == 11000) {
                    return res.send({
                        error: "poolIdTaken"
                    });
                }
            }

            // Niet known bij ons :)
            return res.send({
                error: "unknownError"
            })
        }
    }

    /**
     * Valideert input en creeert een gebruiker.
     */
    public Update = async (req: IReq, res: Express.Response) => {

        try {


        } catch (error) {
            console.log("Error tijdens het maken van account", error);

            // Check of het een mongo error is
            if (error.hasOwnProperty("code")) {

                // Duplicate key error == username is al ingebruik
                if (error.code == 11000) {
                    return res.send({
                        error: "usernameTaken"
                    });
                }
            }

            // Niet known bij ons :)
            return res.send({
                error: "unknownError"
            })
        }
    }


    public GetAllPools = async (req: IReq, res: Express.Response) => {

        try {
            // haal alle poules op en verstuur ze
            const pools: IPoolModel[] = await PoolModel.find({});
            res.send(pools);
        } catch (error) {
            console.log(error);
            res.send([]);
        }
    };

}