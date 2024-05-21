import { splitSegment } from "../utilities/split_segment";

export class LocationSegment {
    public static identification: string = 'N4';
    identifier: string = '';
    city: string = '';
    state: string = '';
    zipCode: string = '';

    constructor(segment: string) {
        const parsedSegment = splitSegment(segment);
        this.identifier = parsedSegment[0]?.trim();
        this.city = parsedSegment[1]?.trim();
        this.state = parsedSegment[2]?.trim();
        this.zipCode = parsedSegment[3]?.trim();
    }

    toString(): string {
        return Object.entries(this)
            ?.map(([key, value]) => `${key}: ${value}`)
            ?.join('\n');
    }
}