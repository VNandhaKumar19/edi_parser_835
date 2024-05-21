import { AdjustmentGroupCodeParser } from "../elements/adjustment_group_code";
import { AdjustmentReasonCodeParser } from "../elements/adjustment_reason_code";
import { splitSegment } from "../utilities/split_segment";

export class ServiceAdjustment {
    public static identification: string = 'CAS';
    identifier: string = '';
    groupCode: { code: string, description: string } = { code: '', description: '' };
    reasonCode: { code: string, description: string } = { code: '', description: '' };
    amount: number = 0;

    constructor(segment: string) {
        const parsedSegment = splitSegment(segment);
        this.identifier = parsedSegment[0]?.trim();
        this.groupCode = AdjustmentGroupCodeParser(parsedSegment[1]?.trim());
        this.reasonCode = AdjustmentReasonCodeParser(parsedSegment[2]?.trim());
        this.amount = parseFloat(parsedSegment[3]?.trim());
    }

    toString(): string {
        return Object.entries(this)
            ?.map(([key, value]) => `${key}: ${value}`)
            ?.join('\n');
    }
}