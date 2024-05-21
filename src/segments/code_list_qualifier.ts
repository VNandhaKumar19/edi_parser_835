import { CodeListQualifierParser } from "../elements/code_list_qualifier";
import { splitSegment } from "../utilities/split_segment";

export class CodeListQualifier {
    public static identification: string = 'LQ';
    identifier: string = '';
    codeListQualifier: string | null  = null;

    constructor(segment: string) {
        const parsedSegment = splitSegment(segment);
        this.identifier = parsedSegment[0]?.trim();
        this.codeListQualifier = CodeListQualifierParser(parsedSegment[1]?.trim())
    }

    toString(): string {
        return Object.entries(this)
            ?.map(([key, value]) => `${key}: ${value}`)
            ?.join('\n');
    }
}