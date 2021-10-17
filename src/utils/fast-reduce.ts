/*
 * Return an array of unique objects based on predetermined identifier key/value comparison (i.e. an ID)
 * Basically like [...new Set()] for objects
 * */

export function fastReduce<TData = object>(
  inputArray: TData[],
  identifier: keyof TData
): TData[] {
  const result = [];
  const map = new Map();

  for (const item of inputArray) {
    if (!map.has(item[identifier])) {
      map.set(item[identifier], true); // set any value to Map
      result.push(item);
    }
  }

  return result;
}
