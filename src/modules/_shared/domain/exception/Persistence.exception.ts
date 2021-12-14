import {
  BaseException,
  Exceptions,
} from './BaseException.exception';

/**
 * Indicates basic DatabaseException
 *
 * @class DatabaseException
 * @extends {ExceptionBase}
 */
export class PersitenceException extends BaseException {
  readonly name = Exceptions.persistenceException;
}
