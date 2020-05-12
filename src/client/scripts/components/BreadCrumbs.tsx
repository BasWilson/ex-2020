// De preact app basis wordt hier gelegd. Dit is het enige bestand die in de HTML file wordt include.
// Parcel zal alle benodigdheden bundelen voor ons.

import {h, Component, render, Fragment} from "preact";
import pages from "../constants/pages";
import { Link } from "preact-router";
import GlobalCallbacks from "../services/GlobalCallbacks";

export interface IBreadCrumb {
    pages: [{name: string, url: string, customLogic?: Function}]
    [key:string]: any;
}

export default class BreadCrumbs extends Component<{currentPage: string}>  {

    state = {
        override: null
    }

    componentDidMount = () => {
        GlobalCallbacks.Register(this.OverrideBreadCrumbWithHTML, "OverrideBreadCrumbWithHTML");
        GlobalCallbacks.Register(this.RemoveBreadCrumbOverride, "RemoveBreadCrumbOverride");
    }

    OverrideBreadCrumbWithHTML = (value: string) => {
        this.setState({override: value});
    }

    RemoveBreadCrumbOverride = () => {
        this.setState({override: null});
    }

    render() {
        let breadcrumb : IBreadCrumb = pages["/"];
        if (this.props.currentPage) {
            if (pages.hasOwnProperty(this.props.currentPage)) {
                // @ts-ignore
                breadcrumb = pages[this.props.currentPage ? this.props.currentPage : "/"];
            }
        }

        return (
            <div className={"breadcrumbs"}>
                <span>
                {
                    breadcrumb.pages.map((page, index) => {
                        return <Link className={"breadcrumb"} href={page.url}>{index > 0 ? " / " : ""}{page.name}</Link>
                    })
                }
                </span>
            </div>
        )
    }
}
