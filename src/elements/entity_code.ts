import { stringObject } from "../utilities/model";

const entityCodes: stringObject<string> = {
    'QC': 'patient',
    '74': 'insured',
    '82': 'rendering provider',
    '85': 'billing provider'
};

export function EntityCodeParser(value: string): string {
    return entityCodes[value] || value;
}
