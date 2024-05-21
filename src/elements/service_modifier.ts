import { splitElement } from "../utilities/split_element";

export function ServiceModifierParser(value: string, index: number): string {
    if (!value) return '';
    const splitValue: string[] = splitElement(value);
    if (splitValue.length > 2) {
        return splitValue[2 + index];
    }
    return '';
}

