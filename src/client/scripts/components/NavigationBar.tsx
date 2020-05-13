// De preact app basis wordt hier gelegd. Dit is het enige bestand die in de HTML file wordt include.
// Parcel zal alle benodigdheden bundelen voor ons.

import {h, Component, render, Fragment} from "preact";
import IUserModel from "../../../interfaces/user/IUserModel";
import UserService from "../services/UserService";
import AuthenticationService from "../services/AuthenticationService";

export default class NavigationBar extends Component {

    render() {
                
        // Haal het profiel uit ls
        const profile: IUserModel | null = UserService.GetLocalProfile();

        if (profile) {

            // Admin
            if (profile.elevationLevel > 0) {

                return (
                    <nav>
                        <span className={"title"}>EK2020</span>
                        <div>
                            <a href="/pools" className={"button"}>Pouls</a>
                            <a href="/admin" className={"button"}>Admin</a>
                            <a onClick={AuthenticationService.Logout} className={"button"}>Log uit</a>
                        </div>
                    </nav>
                )

            } else {
                // Normale gebruiker
                return (
                    <nav>
                        <span className={"title"}>EK2020</span>
                        <div>
                            <a href="/pools" className={"button"}>Pouls</a>
                            <a onClick={AuthenticationService.Logout} className={"button"}>Log uit</a>
                        </div>
                    </nav>
                )
            }

        } else {

            // Niet ingelogd
            return (
                <nav>
                    <span className={"title"}>EK2020</span>
                    <div>
                        <a href="/login" className={"button"}>Login</a>
                    </div>
                </nav>
            )
        }


    }
}
