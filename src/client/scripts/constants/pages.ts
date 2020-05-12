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
    "/pools": <IBreadCrumb><unknown>{
        pages: [
            {
                name: "Mijn Poules",
                url: "/pools"
            }
        ]
    },
    "/admin": <IBreadCrumb><unknown>{
        pages: [
            {
                name: "admin",
                url: "/admin"
            },
        ]
    },
    "/admin/pool-create": <IBreadCrumb><unknown>{
        pages: [
            {
                name: "admin",
                url: "/admin"
            },
            {
                name: "poule maken",
                url: "/admin/pool-create"
            }
        ]
    },
    "/admin/pools": <IBreadCrumb><unknown>{
        pages: [
            {
                name: "admin",
                url: "/admin"
            },
            {
                name: "poules overzicht",
                url: "/admin/pools"
            }
        ]
    },
    
}