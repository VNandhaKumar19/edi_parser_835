import { splitSegment } from "../utilities/split_segment";

export class Interchange {
    public static identification: string = 'ISA';
    identifier: string = '';
    authorizationInformationQualifier: string = '';
    sender: string = '';
    receiver: string = '';
    transmissionDate: string = '';

    constructor(segment: string) {
        const parsedSegment = splitSegment(segment);
        this.identifier = parsedSegment[0]?.trim();
        this.authorizationInformationQualifier = parsedSegment[1]?.trim();
        this.sender = parsedSegment[6]?.trim();
        this.receiver = parsedSegment[8]?.trim();
        this.transmissionDate = parsedSegment[9]?.trim() + parsedSegment[10]?.trim();
    }

    toString(): string {
        return Object?.entries(this)
            ?.map(([key, value]) => `${key}: ${value}`)
            ?.join('\n');
    }
}