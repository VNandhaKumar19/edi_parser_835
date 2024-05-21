import { dateQualifierParser } from "../elements/date_qualifier";
import { splitSegment } from "../utilities/split_segment";

export class DateSegment {
    public static identification: string = 'DTM';
    identifier: string = '';
    date: string = '';
    qualifier: string = '';

    constructor(segment: string) {
        const [identifier, qualifier, date] = splitSegment(segment);
        this.identifier = identifier?.trim();
        this.qualifier = dateQualifierParser(qualifier?.trim());
        this.date = date?.trim();
    }

    toString(): string {
        return `Identifier: ${this.identifier}, Qualifier: ${this.qualifier}, Date: ${this.date}`;
    }
}

