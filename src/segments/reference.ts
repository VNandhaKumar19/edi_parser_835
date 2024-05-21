import { ReferenceQualifierParser } from "../elements/reference_qualifier";
import { splitSegment } from "../utilities/split_segment";

export class Reference {
    public static identification: string = 'REF';
    identifier: string = '';
    qualifier: { code: string, description: string } = { code: '', description: '' };
    value: string = '';

    constructor(segment: string) {
        const parsedSegment = splitSegment(segment);
        this.identifier = parsedSegment[0]?.trim();
        this.qualifier = ReferenceQualifierParser(parsedSegment[1]?.trim());
        this.value = parsedSegment[2]?.trim();
    }

    toString(): string {
        return Object.entries(this)
            ?.map(([key, value]) => `${key}: ${value}`)
            ?.join('\n');
    }
}