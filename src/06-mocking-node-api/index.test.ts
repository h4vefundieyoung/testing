import path from 'path';
import fs from 'fs';
import { randomBytes } from 'crypto';

import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';

const delay = 1000;

describe('doStuffByTimeout', () => {
  beforeEach(() => {
    jest.spyOn(global, 'setTimeout');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const cb = jest.fn();

    doStuffByTimeout(cb, delay);

    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(cb, delay);
  });

  test('should call callback only after timeout', () => {
    const cb = jest.fn();

    doStuffByTimeout(cb, delay);

    expect(cb).not.toBeCalled();
    jest.runOnlyPendingTimers();
    expect(cb).toBeCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  beforeEach(() => {
    jest.spyOn(global, 'setInterval');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const cb = jest.fn();

    doStuffByInterval(cb, delay);

    expect(setInterval).toBeCalledTimes(1);
    expect(setInterval).toHaveBeenLastCalledWith(cb, delay);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const cb = jest.fn();

    doStuffByInterval(cb, delay);

    expect(cb).not.toBeCalled();

    jest.runOnlyPendingTimers();
    expect(cb).toBeCalledTimes(1);

    jest.runOnlyPendingTimers();
    expect(cb).toBeCalledTimes(2);
  });
});

describe('readFileAsynchronously', () => {
  const mockPath = `./test`;

  test('should call join with pathToFile', async () => {
    jest.spyOn(path, 'join');

    readFileAsynchronously(mockPath);

    expect(path.join).toHaveBeenLastCalledWith(__dirname, mockPath);
  });

  test('should return null if file does not exist', async () => {
    jest.spyOn(fs, 'existsSync').mockReturnValueOnce(false);
    expect(readFileAsynchronously(mockPath)).resolves.toBeNull();
  });

  test('should return file content if file exists', async () => {
    const content = randomBytes(4).toString();

    jest.spyOn(fs, 'existsSync').mockReturnValueOnce(true);
    jest.spyOn(fs.promises, 'readFile').mockResolvedValueOnce(content);

    expect(await readFileAsynchronously(mockPath)).toBe(content);
  });
});
