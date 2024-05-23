import { splitSegment } from "../utilities/split_segment";

export class FinancialInformation {
    public static identification: string = 'BPR';
    identifier: string = '';
    handlingCode: string = '';
    amountPaid: number = 0;
    creditOrDebitFlag: string = '';
    paymentMethod: string = '';
    paymentFormatCode: string = '';
    dfiIdNumberQualifier1: string = '';
    senderDFIIdentifier: string = '';
    accountNoQualifier1: string = '';
    dfiIdNumberQualifier2: string = '';
    senderBankAccountNumber: string = '';
    receiverBankAccountNumber: string = '';
    accountNoQualifier2: string = '';
    payerIdentifier: string = '';
    receiverBankIdNumber: number | null = null;
    transactionDate: string = '';

    constructor(segment: string) {
        const parsedSegment = splitSegment(segment);
        this.identifier = parsedSegment[0]?.trim();
        this.handlingCode = parsedSegment[1]?.trim();
        this.amountPaid = parseFloat(parsedSegment[2]?.trim());
        this.creditOrDebitFlag = parsedSegment[3]?.trim();
        this.paymentMethod = parsedSegment[4]?.trim();
        this.paymentFormatCode = parsedSegment[5]?.trim();
        this.dfiIdNumberQualifier1 = parsedSegment[6]?.trim();
        this.senderDFIIdentifier = parsedSegment[7]?.trim();
        this.accountNoQualifier1 = parsedSegment[8]?.trim();
        this.senderBankAccountNumber = parsedSegment[9]?.trim();
        this.payerIdentifier = parsedSegment[10]?.trim();
        this.dfiIdNumberQualifier2 = parsedSegment[12]?.trim();
        this.receiverBankIdNumber = parseInt(parsedSegment[13]?.trim()) || null;
        this.accountNoQualifier2 = parsedSegment[14]?.trim();
        this.receiverBankAccountNumber = parsedSegment[15]?.trim();
        this.transactionDate = parsedSegment[16]?.trim();
    }

    toString(): string {
        return Object.entries(this)
            ?.map(([key, value]) => `${key}: ${value}`)
            ?.join('\n');
    }
}