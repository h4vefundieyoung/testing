import axios from 'axios';
// import { randomBytes } from 'crypto';

import { throttledGetDataFromApi } from './index';
import { randomBytes } from 'crypto';

describe('throttledGetDataFromApi', () => {
  const baseURL = 'https://jsonplaceholder.typicode.com';
  const relURL = '/posts';

  afterEach(() => {
    jest.clearAllMocks();
    jest.runAllTimers();
  });

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should create instance with provided base url', async () => {
    const mCreate = jest.spyOn(axios, 'create');

    await throttledGetDataFromApi(relURL);

    expect(mCreate).toHaveBeenCalledWith({ baseURL });
  });

  test('should perform request to correct provided url', async () => {
    const mGet = jest.spyOn(axios.Axios.prototype, 'get');

    await throttledGetDataFromApi(relURL);

    expect(mGet).toHaveBeenCalledWith(relURL);
  });

  test('should return response data', async () => {
    const mGet = jest.spyOn(axios.Axios.prototype, 'get');
    const data = randomBytes(4);

    mGet.mockResolvedValue({ data });

    expect(throttledGetDataFromApi(relURL)).resolves.toBe(data);
  });
});
