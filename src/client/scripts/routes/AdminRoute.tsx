import { h, Component, Fragment } from "preact";
import { Link } from "preact-router";

export default class AdminRoute extends Component {

    render() {
        return (
            <div class={"content"}>
                <p>Wat wilt u doen?</p>
                <ul>
                    <li><Link href="/admin/pool-create">Maak een nieuwe poule</Link></li>
                    <li><Link href="/admin/pools">Bekijk alle poules</Link></li>
                </ul>
            </div>

        )
    }
}