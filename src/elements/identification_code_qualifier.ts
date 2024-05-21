import { stringObject } from "../utilities/model";

const identificationCodeQualifiers: stringObject = {
    'MI': 'member identification number',
    'C': "insured's changed unique identification number",
    'PC': 'provider commercial number',
    'XX': 'national provider id'
};

export function IdentificationCodeQualifierParser(value: string): string {
    return identificationCodeQualifiers[value] || value;
}
