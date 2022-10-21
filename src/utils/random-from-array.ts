export default function randomFromArray<T>({
    array,
    amountOfItemsToReturn,
}: {
    array: T[];
    amountOfItemsToReturn: number;
}): T[] {
    const shuffled = [...array].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, amountOfItemsToReturn);
}
