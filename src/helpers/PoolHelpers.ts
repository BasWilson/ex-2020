import IPoolModel from "../interfaces/pool/IPoolModel";

export function IsAPool(pool: any):IPoolModel | null {
    if (!pool.hasOwnProperty("poolId") || 
    !pool.hasOwnProperty("name") || 
    !pool.hasOwnProperty("userIds") ||
    !pool.hasOwnProperty("dateCreated") ||
    !pool.hasOwnProperty("votesByUserId")
    ) {
        return null;
    }

    return <IPoolModel>{
        poolId: pool.poolId,
        name: pool.name,
        userIds: pool.userIds,
        dateCreated: pool.dateCreated,
        votesByUserId: pool.votesByUserId
    }
}