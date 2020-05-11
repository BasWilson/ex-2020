// De preact app basis wordt hier gelegd. Dit is het enige bestand die in de HTML file wordt include.
// Parcel zal alle benodigdheden bundelen voor ons.

import {h, Component, render, Fragment} from "preact";

export default class NavigationBar extends Component {

    render() {
        return (
            <nav>
                <span className={"title"}>EK2020</span>
                <a href="/login" className={"button"}>Login</a>
            </nav>
        )
    }
}
