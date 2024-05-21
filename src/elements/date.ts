export class DateElement {
    parser(value: string): Date | string {
        if (value.length === 10) {
            const year = parseInt(value.slice(0, 2), 10) + 2000;
            const month = parseInt(value.slice(2, 4), 10);
            const day = parseInt(value.slice(4, 6), 10);
            const hour = parseInt(value.slice(6, 8), 10);
            const minute = parseInt(value.slice(8, 10), 10);
            return new Date(year, month - 1, day, hour, minute);
        } else if (value.length === 8) {
            const year = parseInt(value.slice(0, 4), 10);
            const month = parseInt(value.slice(4, 6), 10);
            const day = parseInt(value.slice(6, 8), 10);
            return new Date(year, month - 1, day);
        } else {
            console.warn(`Unable to parse ${value} into a datetime`);
            return value;
        }
    }
}