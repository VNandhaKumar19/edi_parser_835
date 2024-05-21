type Delimiter = {
    character: string;
    count: number;
};

/**
 * The function `splitElement` takes a string segment and splits it using the most frequently occurring
 * delimiter character among a predefined set of delimiters.
 * @param {string} segment - The `splitElement` function takes a `segment` string as input and splits
 * it based on the delimiter that occurs most frequently in the string. The delimiters considered are
 * `^`, `:`, `>`, and `<`.
 * @returns The `splitElement` function returns an array of strings after splitting the input `segment`
 * string using the delimiter character that appears the most frequently in the `segment` string.
 */
export function splitElement(segment: string): string[] {
    if (!segment) return [];
    const delimiters: Delimiter[] = [
        { character: '^', count: 0 },
        { character: ':', count: 0 },
        { character: '>', count: 0 },
        { character: '<', count: 0 }
    ];

    for (let i = 0; i < segment?.length; i++) {
        for (const delimiter of delimiters) {
            if (segment[i] === delimiter.character) {
                delimiter.count++;
            }
        }
    }

    const maxDelimiter = delimiters.reduce((prev, current) => (prev.count > current.count) ? prev : current);
    return segment?.split(maxDelimiter?.character);
}
