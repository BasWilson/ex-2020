import IPoolModel from "../../../interfaces/pool/IPoolModel";

export function CalculatePointsPerUser(pool: IPoolModel) {
    const usersSortedByScore = []
    
    // kijk naar elke user
    for (let i = 0; i < pool.votesByUserId.length; i++) {
        const user = pool.votesByUserId[i];
        let points = 0;

        // Kijk naar 1e tot 4e plek of ze goed zijn
        if (user.votesInOrderByCountry[0] == pool.topFourCountries[0]) {
            points += 10;
        }

        if (user.votesInOrderByCountry[1] == pool.topFourCountries[1]) {
            points += 6;
        }

        if (user.votesInOrderByCountry[2] == pool.topFourCountries[2]) {
            points += 4;
        }

        if (user.votesInOrderByCountry[3] == pool.topFourCountries[3]) {
            points += 2;
        }

        // Kijk nu voor elke stem van de user of die bestaan op een andere plek in de topFour
        for (let i = 0; i < user.votesInOrderByCountry.length; i++) {
            const vote = user.votesInOrderByCountry[i];
            const result = pool.topFourCountries.find((code: string, index: number) => code == vote && index != i);
            if (result) {
                points++;
            }
        }

        // voeg user toe aan result
        usersSortedByScore.push({
            userId: user.userId,
            points: points
        })

    }

    // Sorteer van hoog naar laag
    return usersSortedByScore.sort((a:any, b:any) => a.points - b.points).reverse();
}