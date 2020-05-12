import { IBreadCrumb } from "../components/BreadCrumbs";

export default {
    "/": <IBreadCrumb>{
        pages: [
            {
                name: "home",
                url: "/"
            }
        ]
    },
    "/login": <IBreadCrumb><unknown>{
        pages: [
            {
                name: "login",
                url: "/login"
            }
        ]
    },
    
}