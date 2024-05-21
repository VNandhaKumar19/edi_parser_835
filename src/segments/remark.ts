import { RemarkCodeParser } from "../elements/remark_code";
import { RemarkQualifierParser } from "../elements/remark_qualifier";
import { splitSegment } from "../utilities/split_segment";

export class Remark {
    public static identification: string = 'LQ';
    identifier: string = '';
    qualifier: { code: string, description: string } = { code: '', description: '' };
    code: { code: string, description: string } = { code: '', description: '' };

    constructor(segment: string) {
        const parsedSegment = splitSegment(segment);
        this.identifier = parsedSegment[0]?.trim();
        this.qualifier = RemarkQualifierParser(parsedSegment[1]?.trim());
        this.code = RemarkCodeParser(parsedSegment[2]?.trim());
    }

    toString(): string {
        return Object.entries(this)
            ?.map(([key, value]) => `${key}: ${value}`)
            ?.join('\n');
    }
}