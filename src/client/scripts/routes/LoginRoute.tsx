import {h, Component } from "preact";
import TextField from "../components/TextField";
import AuthenticationService from "../services/AuthenticationService";
import errors from "../constants/errors";

export default class LoginRoute extends Component {

    state = {
        username: "",
        password: ""
    }

    SubmitLogin = async () => {
        const res = await AuthenticationService.LoginOrRegister("login", this.state.username, this.state.password);

        if (res.hasOwnProperty("error")) {
            return alert(errors[res.error]);
        }

        console.log(res);
        
    }

    SubmitRegistration = async () => {
        const res = await AuthenticationService.LoginOrRegister("register", this.state.username, this.state.password);

        if (res.hasOwnProperty("error")) {
            return alert(errors[res.error]);
        }
    }

    ValueChanged = (input: string, val: string) => {
        this.setState({[input]: val});
    }

    render() {
        return (
            <div className={"content"}>
                <div className={"login"}>
                    <h2>Login</h2>
                    <TextField customClasses={"m-t-10"} type={"text"} placeholder={"Gebruikersnaam"} onEnter={this.SubmitLogin} valueChanged={(val: string) => {this.ValueChanged("username", val)}} />
                    <TextField customClasses={"m-t-10"} type={"password"} placeholder={"Wachtwoord"} onEnter={this.SubmitLogin} valueChanged={(val: string) => {this.ValueChanged("password", val)}} />
                    <button className={"m-t-10 button"} onClick={this.SubmitLogin}>Log in</button>
                    <button className={"m-t-10 button"} onClick={this.SubmitRegistration}>Registreer</button>
                </div>
            </div>
        )
    }
}