import { splitElement } from "../utilities/split_element";

export function ServiceOrProductIdParser(value: string): string {
    if (!value) return '';
    const splitValue: string[] = splitElement(value);
    const code: string = splitValue[7] || "";
    return code;
}
