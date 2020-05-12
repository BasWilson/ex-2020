import Axios from "axios";
import endpoints from "../constants/endpoints";

class AuthenticationService {

    public LoginOrRegister = async (action: "login" | "register", username: string, password: string):Promise<any> => {
        try {
            const authRes = await Axios.post(action == "login" ? endpoints.login : endpoints.register, {
                username: username, 
                password: password
            });

            return authRes.data;
        } catch (error) {
            return null;
        }
    }
}

export default new AuthenticationService();