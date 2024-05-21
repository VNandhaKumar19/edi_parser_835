import { AdjustmentGroupCodeParser } from "../elements/adjustment_group_code";
import { AdjustmentReasonCodeParser } from "../elements/adjustment_reason_code";
import { splitSegment } from "../utilities/split_segment";

export class ServiceAdjustment {
    public static identification: string = 'CAS';
    identifier: string = '';
    groupCode: { code: string, description: string } = { code: '', description: '' };
    reasonCode: { code: string, description: string } = { code: '', description: '' };
    quantity: string = '';
    amount: number = 0;
    reasonCode1: { code: string, description: string } = { code: '', description: '' };
    amount1: number = 0;
    quantity1: string = '';
    reasonCode2: { code: string, description: string } = { code: '', description: '' };
    amount2: number = 0;
    quantity2: string = '';
    reasonCode3: { code: string, description: string } = { code: '', description: '' };
    amount3: number = 0;
    quantity3: string = '';
    reasonCode4: { code: string, description: string } = { code: '', description: '' };
    amount4: number = 0;
    quantity4: string = '';
    reasonCode5: { code: string, description: string } = { code: '', description: '' };
    amount5: number = 0;
    quantity5: string = '';

    constructor(segment: string) {
        const parsedSegment = splitSegment(segment);
        this.identifier = parsedSegment[0]?.trim();
        this.groupCode = AdjustmentGroupCodeParser(parsedSegment[1]?.trim());
        this.reasonCode = AdjustmentReasonCodeParser(parsedSegment[2]?.trim());
        this.amount = parseFloat(parsedSegment[3]?.trim() ?? '');
        this.quantity = parsedSegment[4]?.trim() ?? '';
        this.reasonCode1 = AdjustmentReasonCodeParser(parsedSegment[5]?.trim());
        this.amount1 = parseFloat(parsedSegment[6]?.trim() ?? '');
        this.quantity1 = parsedSegment[7]?.trim() ?? '';
        this.reasonCode2 = AdjustmentReasonCodeParser(parsedSegment[8]?.trim());
        this.amount2 = parseFloat(parsedSegment[9]?.trim() ?? '');
        this.quantity2 = parsedSegment[10]?.trim() ?? '';
        this.reasonCode3 = AdjustmentReasonCodeParser(parsedSegment[11]?.trim());
        this.amount3 = parseFloat(parsedSegment[12]?.trim() ?? '');
        this.quantity3 = parsedSegment[13]?.trim() ?? '';
        this.reasonCode4 = AdjustmentReasonCodeParser(parsedSegment[14]?.trim());
        this.amount4 = parseFloat(parsedSegment[15]?.trim() ?? '');
        this.quantity4 = parsedSegment[16]?.trim() ?? '';
        this.reasonCode5 = AdjustmentReasonCodeParser(parsedSegment[17]?.trim());
        this.amount5 = parseFloat(parsedSegment[18]?.trim() ?? '');
        this.quantity5 = parsedSegment[19]?.trim() ?? '';
    }

    toString(): string {
        return Object.entries(this)
            ?.map(([key, value]) => `${key}: ${value}`)
            ?.join('\n');
    }
}