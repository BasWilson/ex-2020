import { h, Component, Fragment } from "preact";
import IUserModel from "../../../interfaces/user/IUserModel";
import IPoolModel from "../../../interfaces/pool/IPoolModel";
import PoolService from "../services/PoolService";


export default class PoolBracket extends Component<{score: { userId: string; points: number; }[], users: IUserModel[]}> {

    ScoreLayer = (props: {min: number, max: number}) => {
        // if (this.props.score.length > props.min) return null;

        return (
            <div className={"pool-brackets__layer"}>
                {
                    this.props.score.map((score, index) => {
                        console.log(index);
                        
                        const user = this.props.users.find(u => u.userId == score.userId);
                        if (!user) return null;
                        if (index < props.min || index > props.max) return null;

                        return (
                            <div className={"pool-brackets__bracket"}>
                                <h3>{user.username}</h3>
                                <span>{score.points}</span>
                            </div>
                        )
                    })
                }
            </div>
        )
    }

    render() {
        return (
            <div className={"container bg-primary m-l-20"}>
                <h2>Eind stand (top 6)</h2>
                <div className={"pool-brackets m-t-10"}>
                    <this.ScoreLayer min={0} max={1} />
                    <this.ScoreLayer min={1} max={3} />
                    <this.ScoreLayer min={3} max={4} />
                </div>
            </div>
        )
    }
}