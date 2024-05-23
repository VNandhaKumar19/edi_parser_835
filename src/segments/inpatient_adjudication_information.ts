import { splitSegment } from "../utilities/split_segment";

export class InpatientAdjudicationInformation {
    public static identification: string = 'MIA';
    public identifier: string = '';
    public covered_days_or_visit_count: number | null = null;
    public pps_operating_outlier_amount: number | null = null;
    public lifetime_psychiatric_days_count: number | null = null;
    public claim_DGR_amount: number | null = null;
    public claim_disproportionate_share_amount: number | null = null;
    public claim_msp_pass_thru_amt: number | null = null;
    public claim_pps_capital_amount: number | null = null;
    public pps_capital_fsp_drg_amt: number | null = null;
    public pps_capital_hsp_drg_amt: number | null = null;
    public pps_capital_dsh_drg_amt: number | null = null;
    public old_capital_amount: number | null = null;
    public pps_capital_ime_amount: number | null = null;
    public pps_oper_hsp_spec_drg_amt: number | null = null;
    public cost_report_day_count: number | null = null;
    public pps_oper_fsp_spec_drg_amt: number | null = null;
    public claim_pps_outlier_amount: number | null = null;
    public claim_indirect_teaching: string = '';
    public non_pay_prof_comp_amt: number | null = null;
    public claim_payment_remark_cd_1 : string = '';
    public claim_payment_remark_cd_2 : string = '';
    public claim_payment_remark_cd_3 : string = '';
    public claim_payment_remark_cd_4 : string = '';
    public claim_payment_remark_cd_5 : string = '';
    public pps_capital_exception_amt: number | null = null;

    constructor(segment: string) {
        const parsedSegment = splitSegment(segment);
        this.identifier = parsedSegment[0]?.trim();
        this.covered_days_or_visit_count = parseInt(parsedSegment[1]?.trim() ?? "");
        this.pps_operating_outlier_amount = parseFloat(parsedSegment[2]?.trim() ?? "");
        this.lifetime_psychiatric_days_count = parseInt(parsedSegment[3]?.trim() ?? "");
        this.claim_DGR_amount = parseFloat(parsedSegment[4]?.trim() ?? "");
        this.claim_payment_remark_cd_1 = parsedSegment[5]?.trim();
        this.claim_disproportionate_share_amount = parseFloat(parsedSegment[6]?.trim() ?? "");
        this.claim_msp_pass_thru_amt = parseFloat(parsedSegment[7]?.trim() ?? "");
        this.claim_pps_capital_amount = parseFloat(parsedSegment[8]?.trim() ?? "");
        this.pps_capital_fsp_drg_amt = parseFloat(parsedSegment[9]?.trim() ?? "");
        this.pps_capital_hsp_drg_amt = parseFloat(parsedSegment[10]?.trim() ?? "");
        this.pps_capital_dsh_drg_amt = parseFloat(parsedSegment[11]?.trim() ?? "");
        this.old_capital_amount = parseFloat(parsedSegment[12]?.trim() ?? "");
        this.pps_capital_ime_amount = parseFloat(parsedSegment[13]?.trim() ?? "");
        this.pps_oper_hsp_spec_drg_amt = parseFloat(parsedSegment[14]?.trim() ?? "");
        this.cost_report_day_count = parseInt(parsedSegment[15]?.trim() ?? "");
        this.pps_oper_fsp_spec_drg_amt = parseFloat(parsedSegment[16]?.trim() ?? "");
        this.claim_pps_outlier_amount = parseFloat(parsedSegment[17]?.trim() ?? "");
        this.claim_indirect_teaching = parsedSegment[18]?.trim() ?? "";
        this.non_pay_prof_comp_amt = parseFloat(parsedSegment[19]?.trim() ?? "");
        this.claim_payment_remark_cd_2 = parsedSegment[20]?.trim() ?? ""
        this.claim_payment_remark_cd_3 = parsedSegment[21]?.trim() ?? "";
        this.claim_payment_remark_cd_4 = parsedSegment[22]?.trim() ?? "";
        this.claim_payment_remark_cd_5 = parsedSegment[23]?.trim() ?? "";
        this.pps_capital_exception_amt = parseFloat(parsedSegment[24]?.trim() ?? "");
    }

    toString(): string {
        return Object.entries(this)
            ?.map(([key, value]) => `${key}: ${value}`)
            ?.join('\n');
    }
}