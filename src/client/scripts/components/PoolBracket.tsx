import { h, Component, Fragment } from "preact";
import IUserModel from "../../../interfaces/user/IUserModel";
import IPoolModel from "../../../interfaces/pool/IPoolModel";
import PoolService from "../services/PoolService";


export default class PoolBracket extends Component {


    render() {
        return (
            <div className={"container bg-primary m-l-20"}>
                <h2>Eind stand (top 6)</h2>
                <div className={"pool-brackets m-t-10"}>

                    {/* Layer 1 */}
                    <div className={"pool-brackets__layer"}>
                        <div className={"pool-brackets__bracket"}></div>
                    </div>


                    {/* Layer 2 */}
                    <div className={"pool-brackets__layer"}>
                        <div className={"pool-brackets__bracket"}></div>
                        <div className={"pool-brackets__bracket"}></div>
                    </div>

                    {/* Layer 3 */}
                    <div className={"pool-brackets__layer"}>
                        <div className={"pool-brackets__bracket"}></div>
                        <div className={"pool-brackets__bracket"}></div>
                        <div className={"pool-brackets__bracket"}></div>
                    </div>
                </div>
            </div>
        )
    }
}