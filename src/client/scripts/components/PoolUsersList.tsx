import { h, Component, Fragment } from "preact";
import IUserModel from "../../../interfaces/user/IUserModel";
import IPoolModel from "../../../interfaces/pool/IPoolModel";
import PoolService from "../services/PoolService";
import UserService from "../services/UserService";
export default class PoolUsersList extends Component<{profile: IUserModel, pool: IPoolModel, usersInPool: IUserModel[], refreshCallback: Function, score: { userId: string; points: number; }[]}> {

    RemoveUserFromPool = async (userId: string) => {

        // Pak de array met users
        const pool: IPoolModel = this.props.pool!;

        // Verwijder de user uit de array
        pool.userIds.splice(pool.userIds.findIndex(u => u == userId), 1);

        // Verwijder ook uit votes by user
        pool.votesByUserId.splice(pool.votesByUserId.findIndex(user => user.userId == userId), 1);

        // Maak nu een update request naar de server
        const updated = await PoolService.UpdatePool(pool);
        
        if (updated) {
            await this.props.refreshCallback();
        }

    };

    DeleteButton = (props: {elevationLevel: number, userId: string}) => {
        
        // Haal het profiel uit ls
        const profile: IUserModel | null = UserService.GetLocalProfile();

        if (profile) {
            
            if (props.elevationLevel > 0 && props.userId != profile.userId) {
                return <span className={"red"} onClick={() => {this.RemoveUserFromPool(props.userId)}}>X</span>
            }
    
            return null;
        }

        return null;

    };

    render() {
        return (
            <div className={"container bg-primary "}>
                <h2>Stand binnen Poule</h2>
                <div className={"pool-users m-t-10"}>
                    {
                        this.props.usersInPool.map((user: IUserModel) => {
                            const score = this.props.score.find(score => score.userId == user.userId);
                            return (
                                <div onClick={() => { }}>
                                    <span>{user.username}</span>
                                    <span>{score ? score.points + " punten" : "Geen voorspelling"}</span>
                                    <this.DeleteButton userId={user.userId} elevationLevel={this.props.profile.elevationLevel} />
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}