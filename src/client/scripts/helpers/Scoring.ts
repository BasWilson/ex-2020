import IPoolModel from "../../../interfaces/pool/IPoolModel";

export function CalculatePointsPerUser(pool: IPoolModel) {
    const usersSortedByScore = []
    
    // kijk naar elke user
    for (let i = 0; i < pool.votesByUserId.length; i++) {
        const user = pool.votesByUserId[i];
        let points = 0;

        for (let k = 0; k < user.votesInOrderByCountry.length; k++) {
            const countryVote = user.votesInOrderByCountry[k];


            // Per vote kijken wat die goed heeft.
            for (let j = 0; j < pool.topFourCountries.length; j++) {
                const winningCountry = pool.topFourCountries[j];

                if (winningCountry == countryVote) {
                    points += PointsForIndex(j + 1);
                }
            }
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

function PointsForIndex(i: number) {
    // i = de index + 1 van wat je goed hebt. i kan dus 1, 2, 3 of 4 zijn.
    let points = 2 * i;

    // Kijk of hoogste is gehaald (8), doe dan nog 2 punten extra om op 10 te komen
    if (i == 4) {
        points += 2;
    }

    return points;
}