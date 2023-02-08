export default async function (callback) {
    try {
        const data = await callback();
        return [data, null];
    } catch (error) {
        return [null, error];
    }
}
