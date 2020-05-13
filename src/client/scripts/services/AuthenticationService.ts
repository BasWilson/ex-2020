import Axios from "axios";
import endpoints from "../constants/endpoints";
import { route } from "preact-router";

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
    };
    
    public Logout = async () => {
        try {
            const authRes = await Axios.post(endpoints.logout);
            if (authRes.data == true) {

                // Verwijder locale user acc
                localStorage.clear();

                // redirect terug naar login
                route("/login")
            }
            return authRes.data;
        } catch (error) {
            return null;
        }
    };
}

export default new AuthenticationService();