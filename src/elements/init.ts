import { stringObject } from "../utilities/model";

export abstract class Elements {
    private private_name: string = '';

    __set_name__(owner: stringObject, name: string): void {
        this.private_name = '_' + name;
    }

    __get__(obj: stringObject): stringObject {
        return obj[this.private_name];
    }

    __set__(obj: stringObject, value: string): void {
        value = this.parser(value);
        obj[this.private_name] = value;
    }

    abstract parser(value: string): string;
}

export class Code {
    code: string;
    description: string;

    constructor(code: string, description: string) {
        this.code = code;
        this.description = description;
    }

    toString(): string {
        return JSON.stringify(this);
    }
}