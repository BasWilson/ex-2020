// De preact app basis wordt hier gelegd. Dit is het enige bestand die in de HTML file wordt include.
// Parcel zal alle benodigdheden bundelen voor ons.

import {h, Component, render, Fragment} from "preact";
import pages from "../constants/pages";

export interface IBreadCrumb {
    pages: [{name: string, url: string}]
    [key:string]: any;
}

export default class BreadCrumbs extends Component<{currentPage: string}>  {

    render() {

        // @ts-ignore
        const breadCrumb: IBreadCrumb = pages[this.props.currentPage ? this.props.currentPage : "/"];
        return (
            <div className={"breadcrumbs"}>
                <span>
                {
                    breadCrumb.pages.map((page, index) => {
                        return <a className={"breadcrumb"} href={page.url}>{index > 0 ? " / " : ""}{page.name}</a>
                    })
                }
                </span>
            </div>
        )
    }
}
