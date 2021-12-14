import { Global, Module } from '@nestjs/common';
import { CACHE_REPOSITORY } from './domain/repository/Cache.repository';
import {
  RedisFactory,
  REDIS_CLIENT,
} from './infrastructure/persistence/factory/Redis/Redis.factory';
import { CacheRedisRepository } from './infrastructure/persistence/repository/Redis/CacheRedis.repository';
import { getEnv } from './infrastructure/utils/getEnv';

const redisOptions = getEnv('redis');

@Global()
@Module({
  providers: [
    // {
    //     provide: REDIS_CLIENT,
    //     useFactory: () => {
    //         return RedisFactory(redisOptions);
    //     },
    // },
    // {
    //     provide: CACHE_REPOSITORY,
    //     useClass: CacheRedisRepository,
    // },
  ],
  imports: [],
  // exports: [REDIS_CLIENT, CACHE_REPOSITORY],
})
export class SharedModule {}
