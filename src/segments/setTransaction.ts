import { splitSegment } from "../utilities/split_segment";

export class SetTransaction {
    public static identification: string = 'ST';
    identifier: string = '';
    identifierCode: string = '';
    controlNumber: string = '';
    reference: string = '';

    constructor(segment: string) {
        const parsedSegment = splitSegment(segment);
        this.identifier = parsedSegment[0]?.trim() ?? '';
        this.identifierCode = parsedSegment[1]?.trim() ?? '';
        this.controlNumber = parsedSegment[2]?.trim() ?? '';
        this.reference = parsedSegment[3]?.trim() ?? '';
        
    }

    toString(): string {
        return Object.entries(this)
            ?.map(([key, value]) => `${key}: ${value}`)
            ?.join('\n');
    }
}