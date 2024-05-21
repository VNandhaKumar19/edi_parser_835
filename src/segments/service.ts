import { ServiceCodeParser } from "../elements/service_code";
import { ServiceModifierParser } from "../elements/service_modifier";
import { ServiceProcedureCodeDescriptionParser } from "../elements/service_procedure_code_description";
import { ServiceOrProductIdParser } from "../elements/service_produce_id";
import { ServiceQualifierParser } from "../elements/service_qualifier";
import { getElement, splitSegment } from "../utilities/split_segment";

export class Service {
    public static identification: string = 'SVC';
    identifier: string = '';
    chargeAmount: number = 0;
    paidAmount: number = 0;
    code: string = '';
    qualifier: string = '';
    modifier1: string = '';
    modifier2: string = '';
    modifier3: string = '';
    modifier4: string = '';
    procedure_code_description: string = '';
    product_or_service_id: string = '';
    allowedUnits: number = 0;
    billedUnits: number = 0;
    nubc_revenue_code: string = ''
    units_of_service_paid_count: number = 0;
    medical_procedure_qualifier: string = '';
    medical_procedure_code: string = '';
    medical_procedure_modifier1: string = '';
    medical_procedure_modifier2: string = '';
    medical_procedure_modifier3: string = '';
    medical_procedure_modifier4: string = '';
    medical_procedure_procedure_code_description: string = '';
    medical_procedure_product_or_service_id: string = '';

    constructor(segment: string) {
        const parsedSegment = splitSegment(segment);
        this.identifier = parsedSegment[0]?.trim();
        this.qualifier = ServiceQualifierParser(parsedSegment[1]?.trim());
        this.code = ServiceCodeParser(parsedSegment[1]?.trim());
        this.modifier1 = ServiceModifierParser(parsedSegment[1]?.trim(), 0) ?? '';
        this.modifier2 = ServiceModifierParser(parsedSegment[1]?.trim(), 1) ?? '';
        this.modifier3 = ServiceModifierParser(parsedSegment[1]?.trim(), 2) ?? '';
        this.modifier4 = ServiceModifierParser(parsedSegment[1]?.trim(), 3) ?? '';
        this.procedure_code_description = ServiceProcedureCodeDescriptionParser(parsedSegment[1]?.trim());
        this.product_or_service_id = ServiceOrProductIdParser(parsedSegment[1]?.trim());
        this.chargeAmount = parseFloat(parsedSegment[2]?.trim() ?? '');
        this.paidAmount = parseFloat(parsedSegment[3]?.trim() ?? '');
        this.nubc_revenue_code = parsedSegment[4]?.trim();
        this.units_of_service_paid_count = parseInt(parsedSegment[5]?.trim() ?? '');
        this.medical_procedure_qualifier = ServiceQualifierParser(parsedSegment[6]?.trim());
        this.medical_procedure_code = ServiceCodeParser(parsedSegment[6]?.trim());
        this.medical_procedure_modifier1 = ServiceModifierParser(parsedSegment[6]?.trim(), 0) ?? '';
        this.medical_procedure_modifier2 = ServiceModifierParser(parsedSegment[6]?.trim(), 1) ?? '';
        this.medical_procedure_modifier3 = ServiceModifierParser(parsedSegment[6]?.trim(), 2) ?? '';
        this.medical_procedure_modifier4 = ServiceModifierParser(parsedSegment[6]?.trim(), 3) ?? '';
        this.medical_procedure_procedure_code_description = ServiceProcedureCodeDescriptionParser(parsedSegment[6]?.trim());
        this.medical_procedure_product_or_service_id = ServiceOrProductIdParser(parsedSegment[6]?.trim());

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
