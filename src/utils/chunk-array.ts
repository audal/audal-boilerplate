export default function chunkArray<T = never>(arr: T[], value: number): T[][] {
    const finalArray = [];
    if (arr?.length) {
        for (let i = 0; i < arr.length; i += value) {
            finalArray.push(arr.slice(i, value + i));
        }
    }
    return finalArray;
}
