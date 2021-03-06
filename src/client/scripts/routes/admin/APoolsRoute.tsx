import { h, Component, Fragment } from "preact";
import { route } from "preact-router";
import PoolService from "../../services/PoolService";
import IPoolModel from "../../../../interfaces/pool/IPoolModel";
import UserService from "../../services/UserService";

export default class APoolsRoute extends Component {

    state = {
        pools: []
    }

    componentDidMount = async () => {
        // Check of ingelogd
        if (!UserService.GetLocalProfile()) return route("/login");
        
        if (!UserService.IsAdmin()) return route("/");

        this.setState({pools: await PoolService.GetAllPools()});
    }

    render() {
        return (
            <div class={"content"}>
                <div className={"container login bg-primary"}>
                    <h2>Bestaande poules</h2>
                    <div className={"pool-search-results m-t-10"}>
                        {
                            this.state.pools.map((pool: IPoolModel) => {
                                return <div onClick={() => {route(`/pools/${pool.poolId}`)}}><span>{pool.name}</span></div>
                            })
                        }
                    </div>
                    <button className={"m-t-10 button"} onClick={() => {route("/admin/pool-create")}}>Maak een nieuwe</button>
                </div>
            </div>
        )
    }
}