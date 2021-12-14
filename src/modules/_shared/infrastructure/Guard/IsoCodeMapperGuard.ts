import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { langs } from '../../domain/config/iso-code';
import { shops } from '../../domain/config/iso-code';

@Injectable()
export class IsoCodeMapperGuard implements CanActivate {
  private idShop: number;
  private idLang: number;

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    let { shop } = request.query;

    if (!shop) return false;

    let isValid: boolean = this.ensureParamIsCorrect(shop);

    if (!isValid) return false;

    this.prepareQueryParams(shop);

    request.query.idShop = this.idShop;
    request.query.idLang = this.idLang;

    return true;
  }

  /**
   * Comprobar que la el queryparam introducido tiene el formato correcto [es-ES]
   * @param shop
   * @returns
   */
  private ensureParamIsCorrect(shop: string): boolean {
    let pattern = /^[a-z]{2}-[A-Z]{2}$/;

    let isValid = pattern.test(shop);

    return isValid;
  }

  /**
   * Parsea el atributo es-ES, y nos devuelve 1-11 (idLang-idSHop)
   * @param shop
   */
  private prepareQueryParams(shop: string) {
    let arrParams = shop.split('-');

    let paramsLang = arrParams[0];
    let paramsShop = arrParams[1];

    this.idLang = langs[paramsLang];
    this.idShop = shops[paramsShop];
  }
}
