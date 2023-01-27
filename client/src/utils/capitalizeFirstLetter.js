export function capitalizeFirstLetter(string) {
    if (string.length < 0) {
        return string;
    }

    const firstLetter = string.charAt(0).toUpperCase();
    const stringWithCapital = firstLetter + string.slice(1);

    return stringWithCapital;
}
