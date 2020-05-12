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
            const res = await Axios.get(endpoints.getPool);
            return res.data;
        } catch (error) {
            return [];
        }
    }

    public GetPool = async (poolId: string):Promise<IPoolModel | null> => {
        try {
            const res = await Axios.get(endpoints.getPool + "/" + poolId);
            return res.data;
        } catch (error) {
            return null;
        }
    }
}

export default new PoolService();