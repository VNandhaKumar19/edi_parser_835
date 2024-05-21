import { stringObject } from "../utilities/model";
import { Code } from "./init";

const referenceQualifiers: stringObject<string> = {
    '6R': 'provider control number',
    '0K': 'policy form identifying number',
    'PQ': 'payee identification',
    'TJ': 'federal taxpayer identification number',
    'LU': 'location number',
    'EV': 'receiver identifying number',
    '2U': 'payer identifying number',
    '1L': 'group or policy number',
    'CE': 'class of contract code'
};

export function ReferenceQualifierParser(value: string): Code {
    const description = referenceQualifiers[value] || '';
    return new Code(value, description);
}

