// De preact app basis wordt hier gelegd. Dit is het enige bestand die in de HTML file wordt include.
// Parcel zal alle benodigdheden bundelen voor ons.
import "babel-polyfill";
import {h, Component, render, Fragment} from "preact";
import { Router } from "preact-router";
import HomeRoute from "./routes/HomeRoute";
import LoginRoute from "./routes/LoginRoute";
import NavigationBar from "./components/NavigationBar";
import BreadCrumbs from "./components/BreadCrumbs";
import AdminRoute from "./routes/AdminRoute";
import APoolCreateRoute from "./routes/admin/APoolCreateRoute";
import APoolsRoute from "./routes/admin/APoolsRoute";
import PoolsRoute from "./routes/PoolsRoute";

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
                    <AdminRoute path="/admin"/>
                    <APoolCreateRoute path="/admin/pool-create"/>
                    <APoolsRoute path="/admin/pools"/>
                    <PoolsRoute path="/pools/:poolId"/>
                </Router>
            </Fragment>

        )
    }
}

render(<App />, document.body);