import {h, Component } from "preact";
import { Link, route } from "preact-router";
import UserService from "../services/UserService";

export default class HomeRoute extends Component {

    componentDidMount = () => {
        // Check of ingelogd
        if (!UserService.GetLocalProfile()) return route("/login");
    }

    render() {
        return (
            <div class={"content"}>
                <div className={"container login bg-primary"}>
                    <h2>Wat wilt u doen?</h2>
                    <div className={"pool-search-results m-t-10"}>
                        <Link href="/admin/pools">Bekijk mijn poules</Link>
                    </div>
                </div>
            </div>
        )
    }
}