import { Status, lookupStatus } from "../elements/claim_status";
import { lookupFilingIndicator } from "../elements/filing_indicator_code";
import { splitSegment } from "../utilities/split_segment";

export class ClaimSegment {
    public static identification: string = 'CLP';

    public identifier: string = '';
    public marker: string;
    public status: Status | null = null;
    public chargeAmount: number | null = null;
    public paidAmount: number | null = null;
    public patientResponsibility: string = '';
    public filingIndicatorCode: { code: string, value: string } | null = null;
    public payerControlNumber: string = '';
    public facilityTypeCode: string = '';
    public claimFrequencyTypeCode: string = '';
    public segment: string = '';

    constructor(segment: string) {
        this.segment = segment;
        const parsedSegment = splitSegment(segment);

        this.identifier = parsedSegment[0]?.trim();
        this.marker = parsedSegment[1]?.trim();
        this.status = lookupStatus(parsedSegment[2]?.trim());
        this.chargeAmount = parseFloat(parsedSegment[3]?.trim());
        this.paidAmount = parseFloat(parsedSegment[4]?.trim());
        this.patientResponsibility = parsedSegment[5]?.trim();
        this.filingIndicatorCode = lookupFilingIndicator(parsedSegment[6]?.trim());
        this.payerControlNumber = parsedSegment[7]?.trim();
        this.facilityTypeCode = parsedSegment[8]?.trim();
        this.claimFrequencyTypeCode = parsedSegment[9]?.trim();
    }

    public toString(): string {
        return Object.entries(this)
            ?.map(([key, value]) => `${key}: ${value}`)
            ?.join("\n");
    }
}