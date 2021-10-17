/*
	This function ingests an arrayay and returns random n elements. Useful for randomized article choices.
 */

export default function randomFromArray({
  array,
  amountOfItemsToReturn,
}: {
  array: any[];
  amountOfItemsToReturn: number;
}) {
  const result = new Array(amountOfItemsToReturn);
  let len = array.length;
  const taken = new Array(len);
  if (amountOfItemsToReturn > len) return array;
  while (amountOfItemsToReturn--) {
    const x = Math.floor(Math.random() * len);
    result[amountOfItemsToReturn] = array[x in taken ? taken[x] : x];
    taken[x] = --len in taken ? taken[len] : len;
  }
  return result;
}
