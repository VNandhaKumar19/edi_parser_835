import { EntityCodeParser } from "../elements/entity_code";
import { EntityTypeParser } from "../elements/entity_type";
import { IdentificationCodeQualifierParser } from "../elements/identification_code_qualifier";
import { getElement, splitSegment } from "../utilities/split_segment";

export class Entity {
    public static identification: string = 'NM1';
    identifier: string = '';
    entity: string = '';
    type: string = '';
    lastName: string = '';
    firstName: string | null = null;
    identificationCodeQualifier: string | null = null;
    identificationCode: string | null = null;

    constructor(segment: string) {
        const parsedSegment = splitSegment(segment);
        this.identifier = parsedSegment[0]?.trim();
        this.entity = EntityCodeParser(parsedSegment[1]?.trim());
        this.type = EntityTypeParser(parsedSegment[2]?.trim());
        this.lastName = parsedSegment[3]?.trim();
        this.firstName = getElement(parsedSegment, 4)?.trim() || null;
        this.identificationCodeQualifier = IdentificationCodeQualifierParser(getElement(parsedSegment, 8)?.trim() ?? '') || null;
        this.identificationCode = getElement(parsedSegment, 9)?.trim() || null;
    }

    toString(): string {
        return Object.entries(this)
            .map(([key, value]) => `${key}: ${value}`)
            .join('\n');
    }

    get name(): string {
        return `${this.firstName} ${this.lastName}`.trim();
    }
}