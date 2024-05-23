import { splitSegment } from "../utilities/split_segment";

export class TraceInformation {
    public static identification: string = 'TRN';
    identifier: string = '';
    traceTypeCode: string = '';
    checkEFTNumber: string = '';
    originatingCompany: string = '';
    originatingCompanySupplementalCode: string = '';

    constructor(segment: string) {
        const parsedSegment = splitSegment(segment);
        this.identifier = parsedSegment[0]?.trim();
        this.traceTypeCode = parsedSegment[1]?.trim();
        this.checkEFTNumber = parsedSegment[2]?.trim();
        this.originatingCompany = parsedSegment[3]?.trim();
        this.originatingCompanySupplementalCode = parsedSegment[4]?.trim();
    }

    toString(): string {
        return Object?.entries(this)
            ?.map(([key, value]) => `${key}: ${value}`)
            ?.join('\n');
    }
}