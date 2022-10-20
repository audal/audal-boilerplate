export default function randomFromArray<T>({
    array,
    amountOfItemsToReturn,
}: {
    array: T[];
    amountOfItemsToReturn: number;
}): T[] {
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
