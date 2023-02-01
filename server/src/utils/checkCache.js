import { redisClient, DEFAULT_EXPIRATION } from '../services/redis.js';

export async function checkCache(key, callback) {
    const data = await redisClient.get(key);
    if (data) {
        return JSON.parse(data);
    }

    // Fetches data via callback and sets the return to cache
    const { data: fetchPayload } = await callback();
    await redisClient.set(key, JSON.stringify(fetchPayload), {
        NX: DEFAULT_EXPIRATION,
    });
    return fetchPayload;
}
