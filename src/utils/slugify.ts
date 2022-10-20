export default function slugify(input: string): string {
    return (
        input // Remove html tags
            .replace(/<(?:.|\n)*?>/gm, '') // Remove special characters
            .replace(/[!\"#$%&'\(\)\*\+,\/:;<=>\?\@\[\\\]\^`\{\|\}~]/g, '') // eslint-disable-line no-useless-escape
            // Replace dots and spaces with a short dash
            .replace(/(\s|\.)/g, '-') // Replace multiple dashes with a single dash
            .replace(/-{2,}/g, '-') // Replace long dash with two short dashes
            .replace(/—/g, '--') // Make the whole thing lowercase
            .toLowerCase()
    );
}
