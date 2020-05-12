import { h, Component, Fragment } from "preact";
import TextField from "../../components/TextField";
import { route } from "preact-router";
import IUserModel from "../../../../interfaces/user/IUserModel";
import UserService from "../../services/UserService";
import PoolService from "../../services/PoolService";
import errors from "../../constants/errors";

export default class APoolCreateRoute extends Component {

    state = {
        poolName: "",
        search: "",
        joinedUsers: [],
        userSearchResults: [],
        users: []
    }

    componentDidMount = async () => {
        this.setState({users: await UserService.GetAllUsers()});
    }

    SubmitPoolCreation = async () => {
        if (!this.state.poolName.trim()) return alert(errors["noPoolNameSupplied"]);

        // maak de poule aan
        const res = await PoolService.CreatePool(this.state.poolName, this.state.joinedUsers.map((user:IUserModel) => {return user.userId}));

        if (res.hasOwnProperty("error")) {
            return alert(errors[res.error]);
        }

        route('/admin');
    }

    ValueChanged = (input: string, val: string) => {
        this.setState({[input]: val});
    }

    RemoveUser = (user: IUserModel) => {
        const indexToRemove = this.state.joinedUsers.findIndex((u: IUserModel) => u.userId == user.userId);
        const copyOfUsers = Object.assign([], this.state.joinedUsers);
        copyOfUsers.splice(indexToRemove, 1);
        this.setState({joinedUsers: copyOfUsers});
    }

    AddUser = (user: IUserModel) => {
        const copyOfUsers: IUserModel[] = Object.assign([], this.state.joinedUsers);
        copyOfUsers.push(user);
        this.setState({joinedUsers: copyOfUsers});

        console.log(copyOfUsers)
    }

    FilterSearch = (searchTerm: string) => {

        const foundUsersWithName: IUserModel[] = [];
        for (let i = 0; i < this.state.users.length; i++) {
            const user: IUserModel = this.state.users[i];
            if (user.username.includes(searchTerm)) {
                foundUsersWithName.push(user);
            }
        }
        
        this.setState({userSearchResults: foundUsersWithName});
    }

    render() {
        return (
            <div class={"content"}>
                <div className={"container login"}>
                    <h2>Maak een nieuwe Poule</h2>
                    <TextField customClasses={"m-t-10"} type={"text"} placeholder={"Poule naam"} onEnter={this.SubmitPoolCreation} valueChanged={(val: string) => {this.ValueChanged("poolName", val)}} />
                    
                    <span className={"m-t-20"}>Wie wil je aan de poule toevoegen?</span>
                    <TextField customClasses={"m-t-10"} type={"text"} placeholder={"Zoek op naam"} onEnter={this.SubmitPoolCreation} valueChanged={this.FilterSearch} />
                    <div className={"pool-search-results"}>
                        {
                            this.state.userSearchResults.map((user: IUserModel) => {

                                // Voeg alleen toe als nog niet op de lijst met toegevoegde gebruikers staat
                                if (this.state.joinedUsers.findIndex((u: IUserModel) => u.userId == user.userId) == -1) {
                                    return <div onClick={() => {this.AddUser(user)}}><span>{user.username}</span></div>
                                }
                            })
                        }
                    </div>

                    <span className={"m-t-20"}>Deze mensen zitten in je poule</span>
                    <div className={"pool-search-results m-t-10"}>
                        {
                            this.state.joinedUsers.map((user: IUserModel) => {
                                return <div onClick={() => {this.RemoveUser(user)}}><span>{user.username}</span><span className={"red"}>X</span></div>
                            })
                        }
                    </div>
                    <button className={"m-t-10 button"} onClick={this.SubmitPoolCreation}>Maak aan</button>
                </div>
            </div>
        )
    }
}