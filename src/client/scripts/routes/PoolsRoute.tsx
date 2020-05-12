import {h, Component } from "preact";
import IUserModel from "../../../interfaces/user/IUserModel";
import UserService from "../services/UserService";
import TextField from "../components/TextField";
import PoolService from "../services/PoolService";

export default class PoolsRoute extends Component {

    state = {
        firstPlace: "",
        secondPlace: "",
        thirdPlace: "",
        fourthPlace: "",
        setScoreStage: -1,
        pool: null
    }

    componentWillMount = async () => {

        // Vind het poolId
        const poolId = location.href.split("/").reverse()[0];

        // Haal de pool op
        this.setState({pool: await PoolService.GetPool(poolId)});
    }

    SubmitPoolUpdate = () => {

    }


    ValueChanged = (input: string, val: string) => {
        this.setState({[input]: val});
    }

    AdminControls = () => {

        // Haal het profiel uit ls
        const profile: IUserModel | null = UserService.GetLocalProfile();

        if (profile) {

            if (profile.elevationLevel > 0) {
                return (
                    <div className={"container"}>
                        <h2>Stel de eindscore in</h2>
                        <TextField customClasses={"m-t-10"} type={"text"} placeholder={"1e plek "} onEnter={this.SubmitPoolUpdate} valueChanged={(val: string) => {this.ValueChanged("firstPlace", val)}} />
                        <TextField customClasses={"m-t-10"} type={"text"} placeholder={"2e plek"} onEnter={this.SubmitPoolUpdate} valueChanged={(val: string) => {this.ValueChanged("secondPlace", val)}} />
                        <TextField customClasses={"m-t-10"} type={"text"} placeholder={"3e plek"} onEnter={this.SubmitPoolUpdate} valueChanged={(val: string) => {this.ValueChanged("thirdPlace", val)}} />
                        <TextField customClasses={"m-t-10"} type={"text"} placeholder={"4e plek"} onEnter={this.SubmitPoolUpdate} valueChanged={(val: string) => {this.ValueChanged("fourthPlace", val)}} />
                        <button className={"m-t-20 button"} onClick={this.SubmitPoolUpdate}>Stel scores in</button>
                    </div>
                )
            }
        }

        return null;
    }

    PoolControls = () => {
        return null;
    };

    render() {
        return (
            <div className={"content"}>
                <this.AdminControls />
                <this.PoolControls />
            </div>
        )
    }
}