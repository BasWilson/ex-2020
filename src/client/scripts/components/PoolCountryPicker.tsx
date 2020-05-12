import { h, Component, Fragment } from "preact";
import IPoolModel from "../../../interfaces/pool/IPoolModel";
import PoolService from "../services/PoolService";
import countries from "../constants/countries";

export default class PoolCountryPicker extends Component<{ pool: IPoolModel, finishedCallback: Function }> {

    state = {
        countriesPicked: [],
    }

    render() {
        return (
            <Fragment>
                <div className={"container bg-primary m-r-20"}>
                    <h2>Kies jouw top 4!</h2>
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
                <div className={"container bg-primary "}>
                    <h2>Wie wordt er {this.state.countriesPicked.length + 1}e?</h2>
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
                                        if (copyOfCountries.length >= 4) {

                                            // Sla op in DB
                                            const pool: IPoolModel = this.props.pool!;
                                            await PoolService.PickCountries(copyOfCountries, pool.poolId);

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