import * as Express from "express";
import * as striptags from "striptags";
import UserModel from "../../dbModels/UserModel";
import IUserModel from "../../interfaces/user/IUserModel";
import { PrivateProfile, GenerateJWT, ComparePassword, DecodeJWT, PublicProfile } from "../../helpers/UserHelpers";
import IReq from "../../interfaces/user/IReq";

export default class UsersService {

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
            let { username, password } = req.body;

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
            req.cookies.token = GenerateJWT(savedUser);

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
     * Valideert input en zoekt de bestaande gebruiker
     */
    public LogIn = async (req: IReq, res: Express.Response) => {

        try {

            // Valideer de input
            // Check if username en password zijn mee gegeven
            if (!req.body.hasOwnProperty("username") || !req.body.hasOwnProperty("password")) {

                return res.send({
                    error: "noUsernameOrPassword"
                });
            }

            // Data is er. Strip data van harmfull stuff
            let { username, password } = req.body;

            // Strip HTML tags uit de username en haal whitespace weg
            username = striptags(username).trim();

            // Check lengte van de username
            if (username.length > 30 || username.length < 3) {

                return res.send({
                    error: "usernameLengthInvalid"
                });
            }

            // Check lengte van de password
            if (password.length < 4) {

                return res.send({
                    error: "passwordLengthInvalid"
                });
            }

            // Zoek de user
            const user = <IUserModel>{
                username: username
            };

            // Sla de user op in de database
            const savedUser = await UserModel.findOne(user);

            // Check if savedUser niet null is
            if (!savedUser) {

                return res.send({
                    error: "noUserFoundWithThisCombination"
                });
            }

            // Check if wachtwoord goed is
            const passwordValid = await ComparePassword(password, savedUser.password);
            if (!passwordValid) {

                return res.send({
                    error: "noUserFoundWithThisCombination"
                });
            }

            console.log(DecodeJWT(req.cookies.token));

            // Genereer een JsonWebToken voor toekomstige authenticatie
            res.cookie("token", GenerateJWT(savedUser));

            // Maak van het opgeslagen profiel een private profile en stuur naar de gebruiker
            res.send(PrivateProfile(savedUser));

        } catch (error) {
            console.log("Error tijdens het inloggen op account", error);

            // Niet known bij ons :)
            return res.send({
                error: "unknownError"
            })
        }
    }

    public GetUser = async (req: IReq, res: Express.Response) => {

        try {

            // Check of er een id meegegeven is
            if (req.params.userId) {
                const user: IUserModel | null = await UserModel.findOne({ userId: req.params.userId });

                if (user) {
                    res.send(PublicProfile(user));
                } else {
                    res.sendStatus(404);
                }
            } else {


                // haal alle users op en maak publieke profielen ervan
                const users: IUserModel[] = await UserModel.find({});
                const publicUsers = [];

                for (let i = 0; i < users.length; i++) {
                    publicUsers.push(PublicProfile(users[i]));
                }
                res.send(publicUsers);
            }


        } catch (error) {
            console.log(error);
            res.send([]);
        }
    };

    public Logout = async (req: IReq, res: Express.Response) => {

        try {

            res.clearCookie("token");
            res.send(true);
        } catch (error) {
            console.log(error);
            res.send([]);
        }
    };
}