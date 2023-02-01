import redis from 'redis';

export const DEFAULT_EXPIRATION = 604800; // 1 week

// By default uses localhost:6379
const redisClient = redis.createClient();
redisClient.on('error', (err) => console.log('Redis Client Error: ', err));

// Starts connection here to prevent connect attempts elsewhere
await redisClient.connect();

export { redisClient };
