export class Integer {
    parser(value: string): number | null | string {
        if (value === '') {
            return null;
        }

        const parsedValue = parseInt(value);
        if (!isNaN(parsedValue)) {
            return parsedValue;
        }

        return value;
    }
}
