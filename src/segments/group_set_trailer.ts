import { splitSegment } from "../utilities/split_segment";

export class GroupSetTrailer {
    public static identification: string = 'GE';
    identifier: string = '';
    group_set_count: number | null = null;
    group_set_control_number: string = '';
    constructor(segment: string) {
        const parsedSegment = splitSegment(segment);
        this.identifier = parsedSegment[0]?.trim();
        this.group_set_count = parseInt(parsedSegment[1]?.trim());
        this.group_set_control_number = parsedSegment[2]?.trim();
    }
}