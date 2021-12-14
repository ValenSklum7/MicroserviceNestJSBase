import { Inject, Injectable } from '@nestjs/common';
import { CacheRepository } from '../../../../domain/repository/Cache.repository';
import { RedisClient } from 'redis';
import { REDIS_CLIENT } from '../../factory/Redis/Redis.factory';

@Injectable()
export class CacheRedisRepository implements CacheRepository {
  constructor(
    @Inject(REDIS_CLIENT)
    private client: RedisClient
  ) {}

  public setKey(key: string, value: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.client.set(key, value, (err, res) => {
        if (err) reject(err);
        else resolve();
      });
    });
  }

  public getKey(key: string): Promise<string> {
    return new Promise((resolve, reject) => {
      this.client.get(key, (err, res) => {
        if (err) reject(err);
        else resolve(res);
      });
    });
  }
}
