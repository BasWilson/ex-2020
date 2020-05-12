import {h, Component, Fragment } from "preact";
import IUserModel from "../../../interfaces/user/IUserModel";
import UserService from "../services/UserService";
import TextField from "../components/TextField";
import PoolService from "../services/PoolService";
import IPoolModel from "../../../interfaces/pool/IPoolModel";
import errors from "../constants/errors";

export default class PoolsRoute extends Component {

    state = {
        firstPlace: "",
        secondPlace: "",
        thirdPlace: "",
        fourthPlace: "",
        setScoreStage: -1,
        pool: null,
        usersInPool: []
    }

    componentWillMount = async () => {
        await this.RefreshPoolAndUsers();
    }

    RefreshPoolAndUsers = async () => {
        // Vind het poolId
        const poolId = location.href.split("/").reverse()[0];

        // Haal de pool op
        const pool = await PoolService.GetPool(poolId);

        // Als de poule bestaat, haal alle users uit die pool op
        if (pool) {
            const usersInPool = [];

            for (let i = 0; i < pool.userIds.length; i++) {
                const user = await UserService.GetUserById(pool.userIds[i]);
                if (user) usersInPool.push(user);
            }

            // Update state :)
            this.setState({pool: pool, usersInPool: usersInPool});
        }
    }

    SubmitPoolUpdate = () => {

    }

    RemoveUserFromPool = async (userId: string) => {
        // PoolService.UpdatePool(this.state.pool.poolId, props.userId, )

        // Pak de array met users
        const pool: IPoolModel = this.state.pool!;

        // Verwijder de user uit de array
        pool.userIds.splice(pool.userIds.findIndex(u => u == userId), 1);

        // Verwijder ook uit votes by user
        pool.votesByUserId.splice(pool.votesByUserId.findIndex(user => user.userId == userId), 1);

        // Maak nu een update request naar de server
        const updated = await PoolService.UpdatePool(pool);
        
        if (updated) {
            await this.RefreshPoolAndUsers();
        }

    };


    ValueChanged = (input: string, val: string) => {
        this.setState({[input]: val});
    }

    AdminControls = () => {

        // Haal het profiel uit ls
        const profile: IUserModel | null = UserService.GetLocalProfile();

        if (profile) {

            if (profile.elevationLevel > 0) {
                return (
                    <div className={"container bg-primary m-r-20"}>
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

    DeleteButton = (props: {elevationLevel: number, userId: string}) => {
        if (props.elevationLevel > 0) {
            return <span className={"red"} onClick={() => {this.RemoveUserFromPool(props.userId)}}>X</span>
        }

        return null;
    };

    PoolControls = () => {

        // Haal het profiel uit ls
        const profile: IUserModel | null = UserService.GetLocalProfile();

        if (profile) {
            return (
                <Fragment>
                    <div className={"container bg-primary "}>
                        <div className={"pool-users m-t-10"}>
                            {
                                this.state.usersInPool.map((user: IUserModel) => {
                                    return (
                                        <div onClick={() => {}}>
                                            <span>{user.username}</span>
                                            <span>0 punten</span>
                                            <this.DeleteButton userId={user.userId} elevationLevel={profile.elevationLevel}/>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </Fragment>
            )
        }

        return null;
    };

    render() {
        return (
            <div className={"content container container--h"}>
                <this.AdminControls />
                <this.PoolControls />
            </div>
        )
    }
}