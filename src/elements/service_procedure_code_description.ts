import { splitElement } from "../utilities/split_element";

export function ServiceProcedureCodeDescriptionParser(value: string): string {
    if (!value) return '';
    const splitValue: string[] = splitElement(value);
    const code: string = splitValue[6] || "";
    return code;
}
