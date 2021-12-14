import {
  BaseException,
  Exceptions,
} from './BaseException.exception';

/**
 * Indicates violation of some domain rule.
 *
 * @class DomainException
 * @extends {ExceptionBase}
 */
export class DomainException extends BaseException {
  readonly name = Exceptions.domainException;
}
