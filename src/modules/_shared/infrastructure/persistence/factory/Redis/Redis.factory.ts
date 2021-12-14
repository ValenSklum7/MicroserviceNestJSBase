import { ClientOpts, createClient, RedisClient } from 'redis';

export const REDIS_CLIENT = 'REDIS_CLIENT';

export async function RedisFactory(options: ClientOpts): Promise<RedisClient> {
  try {
    const client = createClient(options);
    client.on('error', (err) => console.log('Redis Client Error', err));
    return client;
  } catch (e) {
    throw e;
  }
}
