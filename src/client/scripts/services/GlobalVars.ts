class GlobalVars {

    private vars: Object;

    constructor() {
        this.vars = {};
    }

    public Add(name: string, value: any) {
        this.vars[name] = value;
    }

    public Get(name: string) {
        if (this.vars.hasOwnProperty(name)) {
            return this.vars[name];
        }
        return null;
    }
}

export default new GlobalVars();