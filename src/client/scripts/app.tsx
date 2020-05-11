// De preact app basis wordt hier gelegd. Dit is het enige bestand die in de HTML file wordt include.
// Parcel zal alle benodigdheden bundelen voor ons.

import {h, Component, render} from "preact";
import { Router } from "preact-router";
import HomeRoute from "./routes/HomeRoute";
import LoginRoute from "./routes/LoginRoute";

class App extends Component {

    render() {
        return (
            <Router>
                <HomeRoute path="/"/>
                <LoginRoute path="/login"/>
            </Router>
        )
    }
}

render(<App />, document.body);