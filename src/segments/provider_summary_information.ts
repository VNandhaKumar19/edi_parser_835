import { splitSegment } from "../utilities/split_segment";

export class ProviderSummaryInformation {
    public static identification: string = 'TS3';
    identifier: string = '';
    providerIdentifier: string = '';
    place_of_service_code: string = '';
    fiscal_period_date: string = '';
    quantity: number | null = null;
    amount: number = 0;
    constructor(segment: string) {
        const parsedSegment = splitSegment(segment);
        this.identifier = parsedSegment[0]?.trim();
        this.providerIdentifier = parsedSegment[1]?.trim();
        this.place_of_service_code = parsedSegment[2]?.trim();
        this.fiscal_period_date = parsedSegment[3]?.trim();
        this.quantity = parseInt(parsedSegment[4]?.trim());
        this.amount = parseFloat(parsedSegment[5]?.trim());
    }
}