import {
  throwError,
  throwCustomError,
  resolveValue,
  MyAwesomeError,
  rejectCustomError,
} from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    const someValue = 1;
    expect(await resolveValue(someValue)).toBe(someValue);
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    const errMsg = 'some amazing error message';
    expect(() => throwError(errMsg)).toThrow(errMsg);
  });

  test('should throw error with default message if message is not provided', () => {
    const defaulErrMsg = 'Oops!';
    expect(() => throwError()).toThrow(defaulErrMsg);
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    expect(() => throwCustomError()).toThrow(MyAwesomeError);
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    expect(rejectCustomError()).rejects.toThrow(MyAwesomeError);
  });
});
