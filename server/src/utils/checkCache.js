import { redisClient, DEFAULT_EXPIRATION } from '../services/redis.js';

import fetchAsync from './fetchAsync.js';

export async function checkCache(key, callback, expire = DEFAULT_EXPIRATION) {
    const cachedData = await redisClient.get(key);
    if (cachedData) {
        return JSON.parse(cachedData);
    }

    const [data, error] = await fetchAsync(callback);

    if (error) {
        return { success: false, error };
    }

    await redisClient.set(key, JSON.stringify(data), {
        NX: expire,
    });

    return data;
}
