import { ServiceCodeParser } from "../elements/service_code";
import { ServiceModifierParser } from "../elements/service_modifier";
import { ServiceQualifierParser } from "../elements/service_qualifier";
import { getElement, splitSegment } from "../utilities/split_segment";

export class Service {
    public static identification: string = 'SVC';
    identifier: string = '';
    chargeAmount: number = 0;
    paidAmount: number = 0;
    code: string = '';
    qualifier: string = '';
    modifier: string = '';
    allowedUnits: number = 0;
    billedUnits: number = 0;

    constructor(segment: string) {
        const parsedSegment = splitSegment(segment);
        this.identifier = parsedSegment[0]?.trim();
        this.code = ServiceCodeParser(parsedSegment[1]?.trim());
        this.qualifier = ServiceQualifierParser(parsedSegment[1]?.trim());
        this.modifier = ServiceModifierParser(parsedSegment[1]?.trim());
        this.chargeAmount = parseFloat(parsedSegment[2]?.trim());
        this.paidAmount = parseFloat(parsedSegment[3]?.trim());

        // Assume unit count of one if unit not provided
        const defaultUnits = this.paidAmount === 0 ? "0" : "1";
        this.allowedUnits = parseInt(getElement(parsedSegment, 5, defaultUnits) ?? "0");
        this.billedUnits = parseInt(getElement(parsedSegment, 7, this.allowedUnits.toString()) ?? "0");
    }

    toString(): string {
        return Object.entries(this)
            .map(([key, value]) => `${key}: ${value}`)
            .join('\n');
    }
}
