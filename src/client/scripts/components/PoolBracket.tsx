import { h, Component, Fragment } from "preact";
import IUserModel from "../../../interfaces/user/IUserModel";


export default class PoolBracket extends Component<{score: { userId: string; points: number; }[], users: IUserModel[]}> {

    render() {
        return (
            <div className={"container bg-primary m-l-20"}>
                <h2>Eind stand</h2>
                <div className={"pool-brackets m-t-10"}>
                    {
                        this.props.score.map((score, index) => {
                            
                            const user = this.props.users.find(u => u.userId == score.userId);
                            if (!user) return null;

                            return (
                                <div className={"pool-brackets__layer"}>
                                    <div className={"pool-brackets__bracket"} style={`width: ${400 / index}px`}>
                                        <h3>{user.username}</h3>
                                        <span>{score.points}</span>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}