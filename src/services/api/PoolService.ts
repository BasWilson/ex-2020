import * as Express from "express";
import * as striptags from "striptags";
import IReq from "../../interfaces/user/IReq";
import IPoolModel from "../../interfaces/pool/IPoolModel";
import PoolModel from "../../dbModels/PoolModel";
import { IsAPool } from "../../helpers/PoolHelpers";
import { DecodeJWT } from "../../helpers/UserHelpers";
import IUserModel from "../../interfaces/user/IUserModel";
import { isArray } from "util";
import countries from "../../client/scripts/constants/countries";

export default class PoolService {
    
    /**
     * Valideert input en creeert een nieuwe Poule
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

            // Haal account op uit token
            const decodedJwt: any = DecodeJWT(req.cookies.token);
            if (!decodedJwt) return res.sendStatus(403);
            const user: IUserModel = decodedJwt.payload;

            // Kijk of de admin er in zit
            if (!userIds.find((userId: string) => userId == user.userId)) {
                userIds.push(user.userId);
            }

            // Creeer de poule
            const pool = <IPoolModel>{
                name: name,
                userIds: userIds
            };

            // Sla de poule op in de database
            await PoolModel.create(pool);
            
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
     *  Update het gehele poule object in de DB, alleen de admin kan deze functie gebruiken.
     *  Pas goed op in de client wanneer deze gebruikt wordt.
     */
    public Update = async (req: IReq, res: Express.Response) => {

        try {

            // Check of de poule er is
            if (!req.body.hasOwnProperty("pool")) {
                return res.send({
                    error: "unknownError"
                })
            }

            // Check of het een pool object is en zorg dan dat ook alleen de data voor een pool achterblijft
            const pool: IPoolModel | null = IsAPool(req.body.pool);

            if (!pool) {
                return res.sendStatus(401);
            }

            // Update met nieuwe pool
            const updated = await PoolModel.findOneAndUpdate({poolId: pool.poolId}, pool, {new: true});

            // Verstuur de nieuwe pool
            if (updated) {
                return res.send(updated);
            }

        } catch (error) {

            // Niet known bij ons :)
            return res.send({
                error: "unknownError"
            })
        }
    }

    /**
     * Haalt een of alle poules op
     */
    public GetPool = async (req: IReq, res: Express.Response) => {

        try {
            // Check of er een id meegegeven is
            if (req.params.poolId) {
                const pool: IPoolModel | null = await PoolModel.findOne({poolId: req.params.poolId});

                if (pool) {
                    res.send(pool);
                } else{
                    res.sendStatus(404);
                }
            } else {
                // Geen poolId meegegeven, geef gewoon alle pouls terug
                
                // Kijk of het de admin is. Dan pakken we alle poules anders alleen waar gebruiker deel van
                // uit maakt.
                const decodedJwt: any = DecodeJWT(req.cookies.token);

                if (!decodedJwt) return res.sendStatus(403);

                const user: IUserModel = decodedJwt.payload;
                
                console.log(user);
                

                // Admin
                if (user.elevationLevel > 0) {
                    // haal alle poules op en verstuur ze
                    const pools: IPoolModel[] = await PoolModel.find({});
                    return res.send(pools);
                }

                // Gebruiker
                const pools: IPoolModel[] = await PoolModel.find({userIds: { $in: [ user.userId ] }});
                return res.send(pools);
            }

        } catch (error) {
            console.log(error);
            res.send([]);
        }
    };

    /**
     * Valideert input en slaat de gekozen landen op
     */
    public PickCountries = async (req: IReq, res: Express.Response) => {

        try {

            if (!req.body.hasOwnProperty("countries") || !req.body.hasOwnProperty("poolId")) {
                return res.send({error: "invaldCountries"});
            }

            // Check of het 4 landen zijn
            if (!isArray(req.body.countries) || req.body.countries.length != 4) {
                return res.send({error: "invaldCountries"});
            }

            // Check of de landen wel bestaan bij ons :0
            req.body.countries.forEach((code: string) => {
                if (!countries.find(c => c.code == code)) {
                    return res.send({error: "invaldCountries"});
                }
            });

            // validated :)

            // haal user id uit de jwt
            const decodedJwt: any = DecodeJWT(req.cookies.token);

            if (!decodedJwt) return res.sendStatus(403);

            const user: IUserModel = decodedJwt.payload;

            // Vind the poule
            const oldPool = await PoolModel.findOne({poolId: req.body.poolId, userIds: { $in: [ user.userId ] }});

            if (!oldPool) {
                return res.send({error: "invaldPoolId"});
            }

            // Check of er nog gestemd mag worden
            if (oldPool.lastMomentToVote != -1) {

                // Kijk of huidige timestamp groter is dan de uiterlijke timestamp
                if (Date.now() > oldPool.lastMomentToVote) {
                    return res.send({error: "noTimeLeftToVote"})
                }
            }

            // Kijk of niet al gekozen
            if (oldPool.votesByUserId.find(vote => vote.userId == user.userId)) {
                return res.send({error: "alreadyPicked"});
            }

            // Update the poule
            oldPool.votesByUserId.push({
                userId: user.userId,
                votesInOrderByCountry: req.body.countries
            })

            // Sla veranderingen op
            await oldPool.save();

            // Verstuur de veranderde pool
            return res.send(oldPool);

        } catch (error) {

            // Niet known bij ons :)
            return res.send({
                error: "unknownError"
            })
        }
    }

}