import { splitSegment } from "../utilities/split_segment";

export class TransactionSetTrailer {
    public static identification: string = 'SE';
    identifier: string = '';
    transaction_set_count: number | null = null;
    transaction_set_control_number: string = '';
    constructor(segment: string) {
        const parsedSegment = splitSegment(segment);
        this.identifier = parsedSegment[0]?.trim();
        this.transaction_set_count = parseInt(parsedSegment[1]?.trim());
        this.transaction_set_control_number = parsedSegment[2]?.trim();
    }
}