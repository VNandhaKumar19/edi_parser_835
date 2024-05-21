import { stringObject } from "../utilities/model";
import { Code } from "./init"

const adjustment_group_codes: stringObject<string> = {
	'CR': 'corrections and reversals',
	'OA': 'other adjustment',
	'PR': 'patient responsibility',
	'CO': 'contractual obligation',
	'PI': 'payor initiated reduction',
}

export function AdjustmentGroupCodeParser(value: string): Code {
	const description = adjustment_group_codes[value];
	return new Code(value, description);
}
