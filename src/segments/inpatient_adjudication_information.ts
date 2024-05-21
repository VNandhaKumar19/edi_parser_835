import { splitSegment } from "../utilities/split_segment";

export class InpatientAdjudicationInformation {
    public static identification: string = 'MIA';
    public identifier: string = '';
    public covered_days_or_visit_count: number | null = null;
    public claim_DGR_amount: number | null = null;
    public claim_payment_remark_code: string = '';
    public claim_disproportionate_share_amount: number | null = null;

    constructor(segment: string) {
        const parsedSegment = splitSegment(segment);
        this.identifier = parsedSegment[0]?.trim();
        this.covered_days_or_visit_count = parseInt(parsedSegment[1]?.trim());
        this.claim_DGR_amount = parseFloat(parsedSegment[4]?.trim());
        this.claim_payment_remark_code = parsedSegment[5]?.trim();
        this.claim_disproportionate_share_amount = parseFloat(parsedSegment[6]?.trim());
    }

    toString(): string {
        return Object.entries(this)
            ?.map(([key, value]) => `${key}: ${value}`)
            ?.join('\n');
    }
}