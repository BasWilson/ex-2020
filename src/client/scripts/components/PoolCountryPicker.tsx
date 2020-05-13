import { h, Component, Fragment } from "preact";
import IPoolModel from "../../../interfaces/pool/IPoolModel";
import PoolService from "../services/PoolService";
import countries from "../constants/countries";
import errors from "../constants/errors";

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
                            // Laat de gekozen landen zien
                            this.state.countriesPicked.map(code => {
                                return (
                                    <div onClick={() => { }}>
                                        <span>{countries.find(c => c.code == code)!.name}</span>
                                    </div>
                                )
                            })
                        }
                        <button className={"m-t-10 button"} onClick={() => {

                            // Reset de gekozen landen
                            this.setState({ countriesPicked: [] });
                        }}>Begin opnieuw</button>
                    </div>
                </div>
                <div className={"container bg-primary "}>
                    <h2>Wie wordt er {this.state.countriesPicked.length + 1}e?</h2>
                    <div className={"pool-users m-t-10"}>
                        {
                            // Laat alle landen zien
                            countries.map(country => {

                                // Kijk of de gebruiker dit land al heeft gekozen
                                if (this.state.countriesPicked.find(code => code == country.code)) return null;

                                return (
                                    <div onClick={async () => {

                                        // Voeg dit land toe aan de array met landen en update de state
                                        const copyOfCountries: string[] = Object.assign([], this.state.countriesPicked);
                                        copyOfCountries.push(country.code);
                                        this.setState({ countriesPicked: copyOfCountries });

                                        // Check of er 4 landen zijn gekozen
                                        if (copyOfCountries.length >= 4) {

                                            // Haal de pool uit de props
                                            const pool: IPoolModel = this.props.pool;

                                            if (!pool) return;

                                            // Maak een request naar de backend om de landen in te locken
                                            const res = await PoolService.PickCountries(copyOfCountries, pool.poolId);

                                            // Check of er errors zijn
                                            if (res.hasOwnProperty("error")) {
                                                alert(errors[res.error]);
                                            }

                                            // Roep de callback functie aan
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