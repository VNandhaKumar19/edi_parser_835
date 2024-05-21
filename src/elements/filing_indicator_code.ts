import { stringObject } from "../utilities/model";

const codes: stringObject<string> = {
    "12": "Preferred Provider Organization(PPO)",
    "13": "Point of Service(POS)",
    "16": "Health Maintenance Organization(HMO) Medicare Risk",
    "AM": "Automobile Medical",
    "DS": "Disability",
    "LM": "Liability Medical",
    "MA": "Medicare Part A",
    "MB": "Medicare Part B",
    "MC": "Medicaid",
    "OF": "Other Federal Program"
}

export function lookupFilingIndicator(code: string): { code: string, value: string } {
    const status = codes[code];
    if (!status) {
        console.warn(`ClaimStatus: Code ${code} does not match a status in the edi-835-parser claim status registry.`);
        return { code: code, value: '' };
    }
    return { code: code, value: status };
}