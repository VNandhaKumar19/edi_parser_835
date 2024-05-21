export class Address {
    public static identification: string = 'N3';
    identifier: string = '';
    address: string = '';
    segment: string;

    constructor(segment: string) {
        this.segment = segment;
        const [identifier, address] = segment?.split('*');
        this.identifier = identifier?.trim();
        this.address = address?.trim();
    }

    toString(): string {
        return `${this.identifier}: ${this.address}`;
    }
}