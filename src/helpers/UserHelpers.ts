import * as bcrypt from "bcrypt";
import * as path from "path";
import * as jwt from "jsonwebtoken";
import IUserModel from "../interfaces/user/IUserModel";
import { readFileSync } from "fs";

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
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(string, salt);
        return hash;
    } catch (error) {
        return error;
    }
}

/**
 * Vergelijkt het gehashde wachtwoord van de gebruiker met de opgeslagen bcrypt hash
 * @param candidatePassword Invoer van gebruiker
 */
export async function ComparePassword(candidatePassword: string, hashedPassword: string) {
    return bcrypt.compare(candidatePassword, hashedPassword);
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

export function GenerateJWT(user: IUserModel) {

    console.log(__dirname);

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

export function VerifyJWT(token: string) {

    const verifyOptions = <jwt.VerifyOptions>{
        issuer: i,
        subject: s,
        audience: a,
        expiresIn: "12h",
        algorithm: ["RS256"]
    };

    var legit = jwt.verify(token, publicKEY, verifyOptions);

    console.log("\nJWT verification result: " + JSON.stringify(legit));
}

export function DecodeJWT(token: string) {
    return jwt.decode(token, {complete: true});
}