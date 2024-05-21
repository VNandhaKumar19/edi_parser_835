import { stringObject } from "../utilities/model";

const paymentMethods: stringObject<string> = {
    'ACH': 'automatic deposit',
    'CHK': 'check',
    'NON': 'no payment'
};

export class PaymentMethod {
    parser(value: string): string {
        value = value.trim();
        return paymentMethods[value] || value;
    }
}
