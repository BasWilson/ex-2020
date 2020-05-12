import { h, Component, Fragment } from "preact";
import IUserModel from "../../../interfaces/user/IUserModel";
import IPoolModel from "../../../interfaces/pool/IPoolModel";
import PoolService from "../services/PoolService";
export default class PoolUsersList extends Component<{profile: IUserModel, pool: IPoolModel, usersInPool: IUserModel[], refreshCallback: Function}> {

    RemoveUserFromPool = async (userId: string) => {
        // PoolService.UpdatePool(this.state.pool.poolId, props.userId, )

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
        if (props.elevationLevel > 0) {
            return <span className={"red"} onClick={() => {this.RemoveUserFromPool(props.userId)}}>X</span>
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
                            return (
                                <div onClick={() => { }}>
                                    <span>{user.username}</span>
                                    <span>0 punten</span>
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