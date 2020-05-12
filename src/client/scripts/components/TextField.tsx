
import { h, Component, } from 'preact';

export interface ITextField {
    placeholder?: string;
    type: "text" | "email" | "password" | "number"; // add more if nessecary
    onEnter?: Function;
    valueChanged?: Function;
    customClasses?: string;
}

export default class TextField extends Component<ITextField> {

    KeyUp = (e: KeyboardEvent) => {
        if (e.keyCode === 13 && this.props.onEnter) {
            // @ts-ignore
            event.preventDefault();
            const el: HTMLInputElement = e.srcElement as HTMLInputElement;
            this.props.onEnter(el.value);
        }

        if (this.props.valueChanged) {
            const el: HTMLInputElement = e.srcElement as HTMLInputElement;
            this.props.valueChanged(el.value);
        }
    };

    render() {
        return (
            <input class={`input ${this.props.customClasses}`} onKeyUp={this.KeyUp} type={this.props.type} placeholder={this.props.placeholder ? this.props.placeholder : ''} />
        );
    }
}
