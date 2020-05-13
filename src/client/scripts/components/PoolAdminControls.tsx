import { h, Component, Fragment } from "preact";
import IPoolModel from "../../../interfaces/pool/IPoolModel";
import PoolService from "../services/PoolService";
import countries from "../constants/countries";
import UserService from "../services/UserService";

export default class PoolAdminControls extends Component<{ pool: IPoolModel, finishedCallback: Function }> {

    state = {
        countriesPicked: [],
    }

    render() {
                
        if (!UserService.IsAdmin()) {
            return null;
        }

        let date;

        console.log(this.props.pool);
        
        if (this.props.pool.lastMomentToVote) {
            date = new Date(this.props.pool.lastMomentToVote);
        }

        return (
            <Fragment>
                <div className={"container bg-primary m-r-20"}>
                    <h2>Laatste stem moment</h2>
                    <div className={"pool-users m-t-10"}>
                        <p>{date ? `${date.toLocaleTimeString()}, ${date.toLocaleDateString()}` : "Geen tijd ingesteld"}</p>
                        <input className={"m-t-10"} style={"color: black;"} type="datetime-local" placeholder="mm-dd-yyyy" onChange={async (e) => {

                            // Pak de ms timestamp
                            const newTime = e.srcElement.valueAsNumber;

                            // Sommige browser zijn niet blij hiermee
                            if (!newTime || newTime == NaN) {
                                return alert("Dit kan niet in Safari of IE, gebruik Chrome of iets anders.");
                            }

                            const oldPool: IPoolModel = this.props.pool!;

                            // haal de nieuwste poule op
                            const pool = await PoolService.GetPool(oldPool.poolId);

                            if (!pool) return;

                            // Stel het laatste stem momment in
                            pool.lastMomentToVote = newTime;

                            // Vraag om te updaten
                            await PoolService.UpdatePool(pool);

                        }} />
                    </div>
                </div>

                <div className={"container bg-primary m-r-20"}>
                    <h2>Wat is de eind score?</h2>
                    <div className={"pool-users m-t-10"}>
                        {
                            this.state.countriesPicked.map(code => {
                                return (
                                    <div onClick={() => { }}>
                                        <span>{countries.find(c => c.code == code)!.name}</span>
                                    </div>
                                )
                            })
                        }
                        <button className={"m-t-10 button"} onClick={() => {
                            this.setState({ countriesPicked: [] });
                        }}>Begin opnieuw</button>
                    </div>
                </div>
                <div className={"container bg-primary m-r-20"}>
                    <h2>Welk land is er {this.state.countriesPicked.length + 1}e geworden?</h2>
                    <div className={"pool-users m-t-10"}>
                        {
                            countries.map(country => {

                                // Kijk of die al is toegevoegd
                                if (this.state.countriesPicked.find(code => code == country.code)) return null;

                                return (
                                    <div onClick={async () => {

                                        // Voeg dit land toe aan de array met landen
                                        const copyOfCountries: string[] = Object.assign([], this.state.countriesPicked);
                                        copyOfCountries.push(country.code);
                                        this.setState({ countriesPicked: copyOfCountries });

                                        // Check of alle vier gemaakt zijn
                                        if (copyOfCountries.length == 4) {

                                            console.log(copyOfCountries);
                                            // Haal meest recente op
                                            const oldPool: IPoolModel = this.props.pool!;
                                            const pool = await PoolService.GetPool(oldPool.poolId);

                                            if (!pool) return;

                                            // Stel de score in
                                            pool.topFourCountries = copyOfCountries;

                                            console.log(pool);

                                            // Vraag om te updaten
                                            await PoolService.UpdatePool(pool);

                                            this.props.finishedCallback();
                                        }
                                    }}>
                                        <span>{country.name}</span>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </Fragment>
        )
    }
}