export default function readingTime(body: string) {
	return Math.max(1, Math.floor(body.length / 200));
}
