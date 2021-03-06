var passwordHash = require('password-hash');
import * as path from "path";
import * as jwt from "jsonwebtoken";
import IUserModel from "../interfaces/user/IUserModel";
import { readFileSync } from "fs";

// Keys om de token mee te signen. Deze zijn 512bit
const privateKEY = readFileSync(path.resolve(__dirname + '../../../keys/private.key'), 'utf8');
const publicKEY = readFileSync(path.resolve(__dirname + '../../../keys/public.key'), 'utf8');
const i = 'EK2020';
const s = 'ek2020@ict-lab.nl';
const a = 'https://82399.ict-lab.nl';

/**
 * Genereert een bcrypt hash van een string
 * @param string bv: password
 */
export async function GenerateBcryptHash(string: string): Promise<Error | string> {
    try {
        const hashedPassword = passwordHash.generate(string);
        // const salt = await bcrypt.genSalt(10);
        // const hash = await bcrypt.hash(string, salt);
        return hashedPassword;
    } catch (error) {
        return error;
    }
}

/**
 * Vergelijkt het gehashde wachtwoord van de gebruiker met de opgeslagen bcrypt hash
 * @param candidatePassword Invoer van gebruiker
 */
export async function ComparePassword(candidatePassword: string, hashedPassword: string) {
    return passwordHash.verify(candidatePassword, hashedPassword);
}

/**
 * Maakt van een user model een publieke user die veilig is om naar clients te sturen
 * @param user De volledige user
 */
export function PublicProfile(user: IUserModel) {
    return {
        username: user.username,
        userId: user.userId
    }
}

/**
 * Maakt van een user model een private user die veilig is om naar eigenaar van het account te sturen
 * @param user De volledige user
 */
export function PrivateProfile(user: IUserModel) {
    return {
        username: user.username,
        userId: user.userId,
        dateJoined: user.dateJoined,
        pouleIds: user.pouleIds,
        elevationLevel: user.elevationLevel
    }
}

// Creeer en sign JWT aan de hand van de user's model
export function GenerateJWT(user: IUserModel) {

    const payload = {
        username: user.username,
        userId: user.userId,
        dateJoined: user.dateJoined,
        elevationLevel: user.elevationLevel
    };

    const signOptions = <jwt.SignOptions>{
        issuer: i,
        subject: s,
        audience: a,
        expiresIn: "12h",
        algorithm: "RS256"
    };

    const token = jwt.sign(payload, privateKEY, signOptions);

    return token;
}

/**
 * Verifieer of de token valide is.
 * @param token JWT
 */
export function VerifyJWT(token: string) {

    const verifyOptions = <jwt.VerifyOptions>{
        issuer: i,
        subject: s,
        audience: a,
        expiresIn: "12h",
        algorithm: ["RS256"]
    };

    const legit = jwt.verify(token, publicKEY, verifyOptions);
}

/**
 * Decode de data uit een token.
 * @param token JWT
 */
export function DecodeJWT(token: string) {
    return jwt.decode(token, {complete: true});
}