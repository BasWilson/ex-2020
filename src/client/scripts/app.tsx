// De preact app basis wordt hier gelegd. Dit is het enige bestand die in de HTML file wordt include.
// Parcel zal alle benodigdheden bundelen voor ons.

import {h, Component, render, Fragment} from "preact";
import { Router } from "preact-router";
import HomeRoute from "./routes/HomeRoute";
import LoginRoute from "./routes/LoginRoute";
import NavigationBar from "./components/NavigationBar";
import BreadCrumbs from "./components/BreadCrumbs";
import pages from "./constants/pages";

class App extends Component {

    state = {
        currentPage: "/"
    };

    PageChanged = (event: any) => {
        this.setState({currentPage: event.url});
    };

    render() {
        return (
            <Fragment>
                <NavigationBar />
                <BreadCrumbs currentPage={this.state.currentPage} />
                <Router onChange={this.PageChanged}>
                    <HomeRoute path="/"/>
                    <LoginRoute path="/login"/>
                </Router>
            </Fragment>

        )
    }
}

render(<App />, document.body);