export const CACHE_REPOSITORY = 'CACHE_REPOSITORY';

export interface CacheRepository {
  getKey(key: string): Promise<string>;
  setKey(key: string, value: string): Promise<void>;
}
