import Axios from "axios";
import endpoints from "../constants/endpoints";
import IPoolModel from "../../../interfaces/pool/IPoolModel";

class PoolService {

    public CreatePool = async (name: string, userIds: string[]):Promise<any> => {
        try {
            const authRes = await Axios.post(endpoints.poolCreate, {
                name: name,
                userIds: userIds
            });

            return authRes.data;
        } catch (error) {
            return null;
        }
    }

    public GetAllPools = async ():Promise<IPoolModel[]> => {
        try {
            const res = await Axios.get(endpoints.getAllPools);
            return res.data;
        } catch (error) {
            return [];
        }
    }
}

export default new PoolService();