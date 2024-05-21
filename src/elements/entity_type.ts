import { stringObject } from "../utilities/model";

const entityTypes: stringObject<string> = {
    '1': 'person',
    '2': 'entity',
};

export function EntityTypeParser(value: string): string {
    return entityTypes[value] || value;
}