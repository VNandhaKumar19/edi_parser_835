import { stringObject } from "../utilities/model";
import { Elements } from "./init";

export class Identifier extends Elements {
    private _value: string | null = null;
    privateName: string = '';

    public set(obj: stringObject<string>, value: string): void {
        if (obj.identification !== value) {
            throw new Error('Class identifier does not match segment identifier.');
        }

        this._value = this.parser(value);
        obj[this.privateName] = this._value;
    }

    public parser(value: string): string {
        return value;
    }
}