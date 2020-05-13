import IPoolModel from "../interfaces/pool/IPoolModel";

/** Valideert een Poule en returned een object terug met alleen wat er nodig is */
export function IsAPool(pool: any):IPoolModel | null {
    if (!pool.hasOwnProperty("poolId") || 
    !pool.hasOwnProperty("name") || 
    !pool.hasOwnProperty("userIds") ||
    !pool.hasOwnProperty("dateCreated") ||
    !pool.hasOwnProperty("topFourCountries") ||
    !pool.hasOwnProperty("votesByUserId") ||
    !pool.hasOwnProperty("lastMomentToVote")
    ) {
        return null;
    }

    return <IPoolModel>{
        poolId: pool.poolId,
        name: pool.name,
        userIds: pool.userIds,
        dateCreated: pool.dateCreated,
        votesByUserId: pool.votesByUserId,
        topFourCountries: pool.topFourCountries,
        lastMomentToVote: pool.lastMomentToVote
    }
}