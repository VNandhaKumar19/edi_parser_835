import { stringObject } from "../utilities/model"

const amount_qualifiers: stringObject = {
    'B6': 'allowed - actual',
    'AU': 'coverage amount'
}

export class AmountQualifier {
    parser(value: string) {
        return amount_qualifiers[value] ?? value;
    }
}