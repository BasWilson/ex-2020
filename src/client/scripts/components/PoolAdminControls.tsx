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

        return (
            <Fragment>
                <div className={"container bg-primary m-r-20"}>
                    <h2>Laatste stem moment</h2>
                    <div className={"pool-users m-t-10"}>
                        <input style={"color: black;"} type="datetime-local" placeholder="mm-dd-yyyy" onChange={(val) => {console.log(val.srcElement.valueAsNumber)}} />
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