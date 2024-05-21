export class Dollars {
    parser(value: string): number | null {
        if (value !== '') {
            return parseFloat(value);
        }
        return null;
    }
}