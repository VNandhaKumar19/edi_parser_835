import { splitSegment } from "../utilities/split_segment";

export class Amount {
    public static identification: string = 'AMT';

    public identifier: string;
    public qualifier: string;
    public amount: number = 0;
    public segment: string = '';

    constructor(segment: string) {
        this.segment = segment;
        const parsedSegment = splitSegment(segment);

        this.identifier = parsedSegment[0];
        this.qualifier = parsedSegment[1];
        this.amount = parseFloat(parsedSegment[2] ?? '');
    }

    public toString(): string {
        return Object.entries(this)
            ?.map(([key, value]) => `${key}: ${value}`)
            ?.join("\n");
    }
}