import { Code } from "../elements/init";
import { PLBAdjustmentCodeParser } from "../elements/plb_adjustment_reason_code";
import { splitSegment } from "../utilities/split_segment";

export class ProviderLevelBalance {
    public static identification: string = 'PLB';
    identifier: string = '';
    providerIdentifier: string = '';
    fiscal_period_date: string = '';
    plb_adjustment_code: Code = { code: "", description: "" };
    claim_reference_number: string = '';
    amount: number = 0;
    constructor(segment: string) {
        const parsedSegment = splitSegment(segment);
        this.identifier = parsedSegment[0]?.trim();
        this.providerIdentifier = parsedSegment[1]?.trim();
        this.fiscal_period_date = parsedSegment[2]?.trim();
        this.plb_adjustment_code = PLBAdjustmentCodeParser(parsedSegment[3]?.trim());
        this.claim_reference_number = parsedSegment[4]?.trim();
        this.amount = parseFloat(parsedSegment[5]?.trim()) ?? 0;
    }
}