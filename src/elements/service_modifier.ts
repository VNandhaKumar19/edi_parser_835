import { splitElement } from "../utilities/split_element";

export function ServiceModifierParser(value: string): string {
    const splitValue: string[] = splitElement(value);
    if (splitValue.length > 2) {
        return splitValue[2];
    }
    return '';
}

