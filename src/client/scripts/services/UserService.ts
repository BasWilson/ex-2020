import Axios from "axios";
import endpoints from "../constants/endpoints";
import IUserModel from "../../../interfaces/user/IUserModel";

class UsersService {

    public GetAllUsers = async ():Promise<IUserModel[]> => {
        try {
            const res = await Axios.get(endpoints.allUsers);
            return res.data;
        } catch (users) {
            return [];
        }
    }
}

export default new UsersService();