/**
 * The function `splitSegment` splits a string segment by either asterisk (*) or pipe (|) based on
 * which delimiter occurs more frequently in the segment.
 * @param {string} segment - The `splitSegment` function takes a string `segment` as input and splits
 * it into an array of strings based on either the asterisk `*` or pipe `|` delimiter. The function
 * then compares the number of segments split by asterisk and pipe, and returns the array of segments
 * split
 * @returns The function `splitSegment` returns an array of strings after splitting the input `segment`
 * string either by asterisk (*) or pipe (|) character, depending on which character occurs more
 * frequently in the input string.
 */
export function splitSegment(segment: string): string[] {
    const asterisk = '*';
    const pipe = '|';

    const asteriskSegmentCount = segment.split(asterisk).length;
    const pipeSegmentCount = segment.split(pipe).length;

    if (asteriskSegmentCount > pipeSegmentCount) {
        return segment.split(asterisk);
    } else {
        return segment.split(pipe);
    }
}

/**
 * The function `findIdentifier` extracts the first segment from a given string.
 * @param {string} segment - A string that represents a segment of code.
 * @returns The function `findIdentifier` is returning the first element of the array `segments` after
 * splitting the input `segment`.
 */
export function findIdentifier(segment: string): string {
    const segments = splitSegment(segment);
    return segments[0];
}

/**
 * The function getElement retrieves an element from an array based on the specified index, with an
 * option to provide a default value if the index is out of bounds.
 * @param {string[]} segment - The `segment` parameter is an array of strings that you want to access
 * elements from.
 * @param {number} index - The `index` parameter is the position of the element you want to retrieve
 * from the `segment` array.
 * @param {string | null} [defaultValue=null] - The `defaultValue` parameter in the `getElement`
 * function is a string or null value that will be returned if the specified index is out of bounds in
 * the `segment` array. If the `index` is within the bounds of the `segment` array, the element at
 * that index will be returned
 * @returns the element at the specified index in the segment array. If the index is within the bounds
 * of the array, it returns the element at that index. If the index is out of bounds, it returns the
 * defaultValue provided (which is either a string or null).
 */
export function getElement(segment: string[], index: number, defaultValue: string | null = null): string | null {
    const element = index < segment.length ? segment[index] : defaultValue;
    return element;
}
