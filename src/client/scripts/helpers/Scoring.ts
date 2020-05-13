import IPoolModel from "../../../interfaces/pool/IPoolModel";

export function CalculatePointsPerUser(pool: IPoolModel) {
    const usersSortedByScore = []
    
    // kijk naar elke user
    for (let i = 0; i < pool.votesByUserId.length; i++) {
        const user = pool.votesByUserId[i];
        let points = 0;

        if (user.votesInOrderByCountry[0] == pool.topFourCountries[0]) {
            points += 11;
        }

        if (user.votesInOrderByCountry[1] == pool.topFourCountries[1]) {
            points += 7;
        }

        if (user.votesInOrderByCountry[2] == pool.topFourCountries[2]) {
            points += 5;
        }

        if (user.votesInOrderByCountry[3] == pool.topFourCountries[3]) {
            points += 3;
        }

        // voeg user toe aan result
        usersSortedByScore.push({
            userId: user.userId,
            points: points
        })

    }

    // Sorteer van hoog naar laag
    usersSortedByScore.sort((a:any, b:any) => a.distance - b.distance);

    return usersSortedByScore;
}