import { h, Component, Fragment } from "preact";
import { Link, route } from "preact-router";
import UserService from "../services/UserService";

export default class AdminRoute extends Component {

    componentDidMount = () => {
        // Check of ingelogd
        if (!UserService.GetLocalProfile()) return route("/login");
    }

    render() {
        return (
            <div class={"content"}>
            <div className={"container login bg-primary"}>
                <h2>Admin panel</h2>
                <div className={"pool-search-results m-t-10"}>
                    <Link href="/admin/pool-create">Maak een nieuwe poule<br /><br/></Link>
                    <Link href="/admin/pools">Bekijk alle poules</Link>
                </div>
            </div>
        </div>
        )
    }
}