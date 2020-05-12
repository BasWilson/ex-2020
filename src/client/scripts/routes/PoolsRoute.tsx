import {h, Component, Fragment } from "preact";
import IUserModel from "../../../interfaces/user/IUserModel";
import UserService from "../services/UserService";
import PoolService from "../services/PoolService";
import PoolUsersList from "../components/PoolUsersList";
import PoolCountryPicker from "../components/PoolCountryPicker";
import PoolAdminControls from "../components/PoolAdminControls";
import GlobalCallbacks from "../services/GlobalCallbacks";
import PoolBracket from "../components/PoolBracket";
import { CalculatePointsPerUser } from "../helpers/Scoring";

export default class PoolsRoute extends Component {

    state = {
        pool: null,
        usersInPool: [],
        pickedCountries: false,
        finalized: false
    }

    componentWillMount = async () => {
        await this.RefreshPoolAndUsers();
    }

    RefreshPoolAndUsers = async () => {

        // Haal het profiel uit ls
        const profile: IUserModel | null = UserService.GetLocalProfile();

        if (profile) {

            // Vind het poolId
            const poolId = location.href.split("/").reverse()[0];

            // GlobalCallbacks.Call("OverrideBreadCrumbWithString", "")

            // Haal de pool op
            const pool = await PoolService.GetPool(poolId);


            // Als de poule bestaat, haal alle users uit die pool op
            if (pool) {
                const usersInPool = [];

                for (let i = 0; i < pool.userIds.length; i++) {
                    const user = await UserService.GetUserById(pool.userIds[i]);
                    if (user) usersInPool.push(user);
                }

                // Check of user al landed gekozen heeft
                const picked = pool.votesByUserId.find(vote => vote.userId == profile.userId);

                const finalized =  pool.topFourCountries.length == 4;

                // Update state :)
                this.setState({pool: pool, usersInPool: usersInPool, pickedCountries: picked ? true : false, finalized: finalized});
            }

        }
    }

    ValueChanged = (input: string, val: string) => {
        this.setState({[input]: val});
    }

    render() {

        if (!this.state.pool) return null;

        // Haal het profiel uit ls
        const profile: IUserModel | null = UserService.GetLocalProfile();

        if (profile) {
            if (!this.state.pickedCountries) {
            
                return (
                    <div className={"content container container--h"}>
                        <PoolCountryPicker pool={this.state.pool!} finishedCallback={() => {this.setState({pickedCountries: true})}} />
                    </div>
                )
            } else {

                if (this.state.finalized) {
                    const score = CalculatePointsPerUser(this.state.pool!);
                    return (
                        <div className={"content container container--h"}>
                            <PoolUsersList profile={profile} pool={this.state.pool!} refreshCallback={this.RefreshPoolAndUsers} usersInPool={this.state.usersInPool} />
                            <PoolBracket score={score} users={this.state.usersInPool} />
                        </div>
                    )
                } else {
                    return (
                        <div className={"content container container--h"}>
                            <PoolAdminControls pool={this.state.pool!} finishedCallback={this.RefreshPoolAndUsers} />
                            <PoolUsersList profile={profile} pool={this.state.pool!} refreshCallback={this.RefreshPoolAndUsers} usersInPool={this.state.usersInPool} />
                        </div>
                    )
                }
            }
        }
    }
}