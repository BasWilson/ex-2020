import {h, Component } from "preact";
import { Link } from "preact-router";

export default class HomeRoute extends Component {

    render() {
        return (
            <div class={"content"}>
                <p>Wat wilt u doen?</p>
                <ul>
                    <li><Link href="/pools">Bekijk mijn pools</Link></li>
                </ul>
            </div>
        )
    }
}