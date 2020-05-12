import * as Express from "express";
import * as striptags from "striptags";
import UserModel from "../../dbModels/UserModel";
import IUserModel from "../../interfaces/user/IUserModel";
import { PrivateProfile, GenerateJWT, ComparePassword } from "../../helpers/UserHelpers";
import IReq from "../../interfaces/user/IReq";

export default class PoolService {
    
    /**
     * Valideert input en creeert een gebruiker.
     */
    public Create = async (req: IReq, res: Express.Response) => {

        try {

            // Valideer de input
            // Check if username en password zijn mee gegeven
            if (!req.body.hasOwnProperty("username") || !req.body.hasOwnProperty("password")) {

                return res.send({
                    error: "noUsernameOrPassword"
                });
            }

            // Data is er. Strip data van harmfull stuff
            let {username, password} = req.body;

            // Strip HTML tags uit de username en haal whitespace weg
            username = striptags(username).trim();

            // Check lengte van de username
            if (username.length > 30 || username.length < 3) {

                return res.send({
                    error: "usernameLengthInvalid"
                });
            }

            // Creeer de user
            // Zoals je kan zien vullen we alleen zelf de username en ww in omdat de rest door mongo 
            // voor ons wordt ingevuld d.m.v. default values.
            // In de UserModel.ts wordt ook het password voor ons gehasht.
            const user = <IUserModel>{
                username: username,
                password: password
            };

            // Sla de user op in de database
            const savedUser = await UserModel.create(user);

            // Genereer een JsonWebToken voor toekomstige authenticatie
            req.session.token = GenerateJWT(savedUser);
            
            // Maak van het opgeslagen profiel een private profile en stuur naar de gebruiker
            res.send(PrivateProfile(savedUser));

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

    /**
     * Valideert input en creeert een gebruiker.
     */
    public Update = async (req: IReq, res: Express.Response) => {

        try {

            // Valideer de input
            // Check if username en password zijn mee gegeven
            if (!req.body.hasOwnProperty("username") || !req.body.hasOwnProperty("password")) {

                return res.send({
                    error: "noUsernameOrPassword"
                });
            }

            // Data is er. Strip data van harmfull stuff
            let {username, password} = req.body;

            // Strip HTML tags uit de username en haal whitespace weg
            username = striptags(username).trim();

            // Check lengte van de username
            if (username.length > 30 || username.length < 3) {

                return res.send({
                    error: "usernameLengthInvalid"
                });
            }

            // Creeer de user
            // Zoals je kan zien vullen we alleen zelf de username en ww in omdat de rest door mongo 
            // voor ons wordt ingevuld d.m.v. default values.
            // In de UserModel.ts wordt ook het password voor ons gehasht.
            const user = <IUserModel>{
                username: username,
                password: password
            };

            // Sla de user op in de database
            const savedUser = await UserModel.create(user);

            // Genereer een JsonWebToken voor toekomstige authenticatie
            req.session.token = GenerateJWT(savedUser);
            
            // Maak van het opgeslagen profiel een private profile en stuur naar de gebruiker
            res.send(PrivateProfile(savedUser));

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

}