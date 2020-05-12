import Axios from "axios";
import endpoints from "../constants/endpoints";
import IUserModel from "../../../interfaces/user/IUserModel";

class UsersService {

    public GetAllUsers = async ():Promise<IUserModel[]> => {
        try {
            const res = await Axios.get(endpoints.users);
            return res.data;
        } catch (users) {
            return [];
        }
    }

    public GetLocalProfile(): IUserModel | null {
        // Haal het profiel uit ls
        const profile = localStorage.getItem("profile");

        if (profile) {
            return JSON.parse(profile) as IUserModel;
        }

        return null;
    }

    public GetUserById = async (userId: string):Promise<IUserModel | null> => {
        try {
            const res = await Axios.get(endpoints.users + "/" + userId);
            return res.data;
        } catch (users) {
            return null;
        }
    }
}

export default new UsersService();