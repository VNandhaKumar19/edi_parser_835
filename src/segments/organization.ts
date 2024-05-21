import { OrganizationParser } from "../elements/organization";
import { OrganizationTypeParser } from "../elements/organization_type";
import { splitSegment } from "../utilities/split_segment";

export class OrganizationSegment {
    public static identification: string = 'N1';
    identifier: string = '';
    type: string = '';
    name: string = '';
    identificationCode: number | null = null;

    constructor(segment: string) {
        const parsedSegment = splitSegment(segment);
        this.identifier = parsedSegment[0]?.trim();
        this.type = OrganizationTypeParser(parsedSegment[1]?.trim());
        this.name = OrganizationParser(parsedSegment[2]?.trim());
        this.identificationCode = parsedSegment?.length >= 5 ? parseInt(parsedSegment[4]?.trim()) : null;
    }

    toString(): string {
        return Object.entries(this)
            ?.map(([key, value]) => `${key}: ${value}`)
            ?.join('\n');
    }
}
