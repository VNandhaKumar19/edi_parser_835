import { stringObject } from "../utilities/model";
import { TransactionSet } from "./transactionSet";

export class TransactionSets implements Iterable<TransactionSet> {
    transactionSets: TransactionSet[];

    constructor(transactionSets: TransactionSet[]) {
        this.transactionSets = transactionSets;
    }

    *[Symbol.iterator](): IterableIterator<TransactionSet> {
        yield* this.transactionSets;
    }

    get length(): number {
        return this.transactionSets?.length;
    }

    toString(): string {
        return this.transactionSets?.map(transactionSet => transactionSet?.toString())?.join("\n");
    }

    static sortColumns(data: stringObject): stringObject {
        const substrings = ['adj', 'ref', 'rem'];
        let variableColumns = data?.columns?.filter((c: string | string[]) => substrings?.some(substring => c?.includes(substring)));
        variableColumns = variableColumns?.sort();

        const staticColumns = data?.columns?.filter((c: string | string[]) => !variableColumns?.includes(c));

        data = data[staticColumns?.concat(variableColumns)];
        return data;
    }

    sumPayments(): number {
        let amount = 0;

        for (const transactionSet of this.transactionSets) {
            amount += transactionSet?.financialInformation?.amountPaid ?? 0;
        }

        return amount;
    }

    countClaims(): number {
        let count = 0;

        for (const transactionSet of this.transactionSets) {
            count += transactionSet?.claims?.length;
        }

        return count;
    }

    countPatients(): number {
        const patients: string[] = [];

        for (const transactionSet of this.transactionSets) {
            for (const claim of transactionSet?.claims) {
                const patient = claim?.patient;
                patients?.push(patient?.identificationCode ?? '');
            }
        }

        const uniquePatients = new Set(patients);
        return uniquePatients?.size;
    }
}