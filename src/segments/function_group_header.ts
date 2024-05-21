import { splitSegment } from "../utilities/split_segment";

export class FunctionGroupHeader {
    public static identification: string = 'GS';
    identifier: string = '';
    functionIdentifier: string = '';
    senderCode: string = '';
    receiverCode: string = '';
    date: string = '';
    time: string = '';
    group_control_number: string = '';
    responsible_agency_code: string = '';
    version: string = '';


    constructor(segment: string) {
        const parsedSegment = splitSegment(segment);
        this.identifier = parsedSegment[0]?.trim();
        this.functionIdentifier = parsedSegment[1]?.trim();
        this.senderCode = parsedSegment[2]?.trim();
        this.receiverCode = parsedSegment[3]?.trim();
        this.date = parsedSegment[4]?.trim();
        this.time = parsedSegment[5]?.trim();
        this.group_control_number = parsedSegment[6]?.trim();
        this.responsible_agency_code = parsedSegment[7]?.trim();
        this.version = parsedSegment[8]?.trim();
    }

    toString(): string {
        return Object.entries(this)
            ?.map(([key, value]) => `${key}: ${value}`)
            ?.join('\n');
    }
}