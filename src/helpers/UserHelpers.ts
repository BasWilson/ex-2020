import * as bcrypt from "bcrypt";

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