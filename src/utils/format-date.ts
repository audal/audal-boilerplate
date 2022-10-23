export default function formatDate(date: Date, separator = ' • '): string {
    return `${date.getDate()}${separator}${date.getMonth() + 1}${separator}${date
        .getFullYear()
        .toString()
        .substr(-2)}`;
}
