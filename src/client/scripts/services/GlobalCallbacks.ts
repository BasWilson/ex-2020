class GlobalCallbacks {

    private callbacks: Object;

    constructor() {
        this.callbacks = {};
    }

    public Register = (func: Function, name: string) => {
        // @ts-ignore
        this.callbacks[name] = func;
    };

    public Call = async (name: string, param1?: any, param2?: any, param3?: any) => {
        if (this.callbacks.hasOwnProperty(name)) {
            // @ts-ignore
            await this.callbacks[name](param1, param2, param3);
        }
    };
}

export default new GlobalCallbacks();