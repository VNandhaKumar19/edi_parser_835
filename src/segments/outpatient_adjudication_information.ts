import { splitSegment } from "../utilities/split_segment";

export class OutpatientAdjudicationInformation {
    public static identification: string = 'MOA';
    public identifier: string = '';
    public reimbursementRate: number | null = null;
    public claim_payable_amount: number | null = null
    public claim_esrd_amount: number | null = null
    public remark_code: string[] = [];
    public nonpayable_professional_comp_amt: number | null = null

    constructor(segment: string) {
        const parsedSegment = splitSegment(segment);
        this.identifier = parsedSegment.shift()?.trim() ?? '';
        this.reimbursementRate = parseInt(parsedSegment?.shift()?.trim() ?? '');
        this.claim_payable_amount = parseFloat(parsedSegment?.shift()?.trim() ?? '');
        this.claim_esrd_amount = parseFloat(parsedSegment?.slice(8,1)[0] ?? '');
        this.nonpayable_professional_comp_amt = parseFloat(parsedSegment?.slice(8,1)[0] ?? '');
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