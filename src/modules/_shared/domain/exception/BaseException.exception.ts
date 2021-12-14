export enum Exceptions {
  argumentInvalid = 'ArgumentInvalidException',
  argumentOutOfRange = 'ArgumentOutOfRangeException',
  argumentNotProvided = 'ArgumentNotProvidedException',
  notFound = 'NotFoundException',
  domainException = 'DomainException',
  conflict = 'ConflictException',
  persistenceException = 'PersistenceException',
}

export interface SerializedException {
  name: string;
  message: string;
  stack?: string;
  metadata?: any;
}

export abstract class BaseException extends Error {
  constructor(readonly message: string, readonly metadata?: any) {
    super(message);
    Error.captureStackTrace(this, this.constructor);
  }

  abstract name: Exceptions;

  toJSON(): SerializedException {
    return {
      name: this.name,
      message: this.message,
      stack: this.stack,
      metadata: this.metadata,
    };
  }
}
