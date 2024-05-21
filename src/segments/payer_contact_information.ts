import { splitSegment } from "../utilities/split_segment";

export class PayerContactInformation {
    public static identification: string = 'PER';
    identifier: string = '';
    functionCode: string = '';
    contactName: string = '';
    details: {
        qualifier: string,
        communication: string,
    }[] = [];

    constructor(segment: string) {
        const parsedSegment = splitSegment(segment);
        this.identifier = parsedSegment.shift()?.trim() ?? '';
        this.functionCode = parsedSegment.shift()?.trim() ?? ''; 
        this.contactName = parsedSegment.shift()?.trim() ?? '';
        while(parsedSegment.length) {
            const detail = {
                qualifier: parsedSegment.shift()?.trim() ?? '',
                communication: parsedSegment.shift()?.trim() ?? ''
            }
            this.details?.push(detail);
        }
    }
}