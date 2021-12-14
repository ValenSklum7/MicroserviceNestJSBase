// import { CACHE_MANAGER, Inject } from '@nestjs/common';
// import { ConfigurationService } from '@Shared/application/Configuration.service';
// import { Cache } from 'cache-manager';

export abstract class BaseController {
  // @Inject(CACHE_MANAGER) protected cacheManager: Cache;
  // @Inject() protected readonly configuration: ConfigurationService;

  // protected get isoLang(): string {
  //     return 'en';
  // }

  // protected get idShop(): number {
  //     return 11;
  // }

  // protected get idLang(): number {
  //     return 1;
  // }

  protected async success(data: any, message?: string, translationVars?: any) {
    return {
      data,
      message,
    };
  }
}
