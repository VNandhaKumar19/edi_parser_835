import { stringObject } from "../utilities/model";
import { Code } from "./init";

const remarkQualifiers: stringObject = {
    'HE': 'claim payment'
};

export function RemarkQualifierParser(value: string): Code {
    const description = remarkQualifiers[value] || '';
    return new Code(value, description);
}
