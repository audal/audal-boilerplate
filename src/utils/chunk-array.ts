export default function chunkArray(arr: any[], value: number) {
    const finalArray = [];
    if (arr?.length) {
        for (let i = 0; i < arr.length; i += value) {
            finalArray.push(arr.slice(i, value + i));
        }
    }
    return finalArray;
}
