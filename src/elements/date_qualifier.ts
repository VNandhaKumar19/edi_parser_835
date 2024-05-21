import { stringObject } from "../utilities/model";

const dateQualifiers: stringObject<string> = {
    '050': 'received',
    '150': 'service period start',
    '151': 'service period end',
    '472': 'service',
    '232': 'claim statement period start',
    '233': 'claim statement period end',
    '405': 'Production Date'
};

export function dateQualifierParser(value: string): string {
    return dateQualifiers[value] || value;
}