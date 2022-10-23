/*
 * Return an array of unique objects based on predetermined identifier key/value comparison (i.e. an ID)
 * Basically like [...new Set()] for objects
 * */

export default function fastReduce<T = never>(
    inputArray: T[],
    identifier: keyof T,
): T[] {
    const result: T[] = [];
    const map = new Map();

    inputArray.forEach((item) => {
        if (!map.has(item[identifier])) {
            map.set(item[identifier], true); // set any value to Map
            result.push(item);
        }
    });

    return result;
}
