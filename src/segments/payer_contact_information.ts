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
    contact_inquiry_reference: string = '';

    constructor(segment: string) {
        const parsedSegment = splitSegment(segment);
        this.identifier = parsedSegment.shift()?.trim() ?? '';
        this.functionCode = parsedSegment.shift()?.trim() ?? '';
        this.contactName = parsedSegment.shift()?.trim() ?? '';
        if (parsedSegment.length === 7) this.contact_inquiry_reference = parsedSegment.pop()?.trim() ?? '';

        while (parsedSegment.length) {
            const detail = {
                qualifier: parsedSegment.shift()?.trim() ?? '',
                communication: parsedSegment.shift()?.trim() ?? ''
            }
            this.details?.push(detail);
        }
    }
}