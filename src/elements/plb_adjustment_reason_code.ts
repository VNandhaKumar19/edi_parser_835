import { stringObject } from "../utilities/model";
import { splitElement } from "../utilities/split_element";
import { Code } from "./init";

const plb_adjustment_codes: stringObject<string> = {
    "AH": "Claim Transmission Fee Amount",
    "B2": "Rebate Amount",
    "BD": "Bad Debt Amount",
    "BN": "Bonus Amount",
    "C5": "Temporary Allowance",
    "CS": "Adjustment",
    "E3": "Withholding Amount",
    "FB": "Forward Balance",
    "IR": "Internal Revenue Service Withholding",
    "J1": "Non-Reimbursable",
    "L3": "Penalty Amount",
    "L6": "Interest Amount",
    "LE": "Federal Payment Levy",
    "OB": "Affiliated Provider(s) Offset Amount",
    "PI": "Periodic Interim Payment (PIP)",
    "WO": "Overpayment Recovery Amount",
    "WU": "Federal Payment Levy",
    "72": "Authorized Return"
}

export function PLBAdjustmentCodeParser(value: string): Code {
    const key = splitElement(value)
    const description = plb_adjustment_codes[key[0]] || plb_adjustment_codes[key[1]] || '';
    return new Code(value, description);
}