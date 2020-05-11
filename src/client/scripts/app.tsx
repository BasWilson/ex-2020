// De preact app basis wordt hier gelegd. Dit is het enige bestand die in de HTML file wordt include.
// Parcel zal alle benodigdheden bundelen voor ons.

import {h, Component, render} from "preact";

class App extends Component {

    render() {
        return (
            <p>Hello!</p>
        )
    }
}

render(<App />, document.body);