import { splitSegment } from "../utilities/split_segment";

export class OutpatientAdjudicationInformation {
    public static identification: string = 'MOA';
    public identifier: string = '';
    public reimbursementRate: number | null = null;
    public claim_payable_amount: number | null = null
    public remark_code: string[] = [];

    constructor(segment: string) {
        const parsedSegment = splitSegment(segment);
        this.identifier = parsedSegment.shift()?.trim() ?? '';
        this.reimbursementRate = parseInt(parsedSegment?.shift()?.trim() ?? '');
        this.claim_payable_amount = parseFloat(parsedSegment?.shift()?.trim() ?? '');
        while (parsedSegment.length) {
            const remark = parsedSegment?.shift()?.trim() ?? '';
            if(remark) {
                this.remark_code.push(remark);
            }
        }
    }

    toString(): string {
        return Object.entries(this)
            ?.map(([key, value]) => `${key}: ${value}`)
            ?.join('\n');
    }
}