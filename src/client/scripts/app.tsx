// De preact app basis wordt hier gelegd. Dit is het enige bestand die in de HTML file wordt include.
// Parcel zal alle benodigdheden bundelen voor ons.

import {h, Component, render, Fragment} from "preact";
import { Router } from "preact-router";
import HomeRoute from "./routes/HomeRoute";
import LoginRoute from "./routes/LoginRoute";
import NavigationBar from "./components/NavigationBar";

class App extends Component {

    render() {
        return (
            <Fragment>
                <NavigationBar />
                <Router>
                    <HomeRoute path="/"/>
                    <LoginRoute path="/login"/>
                </Router>
            </Fragment>

        )
    }
}

render(<App />, document.body);