import { mockOne, mockTwo, mockThree, unmockedFunction } from './index';

jest.mock('./index', () => {
  const originalModule =
    jest.requireActual<typeof import('./index')>('./index');
  return {
    ...originalModule,
    mockOne: jest.fn(),
    mockThree: jest.fn(),
    mockTwo: jest.fn(),
  };
});

describe('partial mocking', () => {
  afterAll(() => {
    jest.unmock('./index');
  });

  test('mockOne, mockTwo, mockThree should not log into console', () => {
    const mLog = jest.spyOn(console, 'log');

    mockOne();
    mockTwo();
    mockThree();

    expect(mLog).not.toBeCalled();
  });

  test('unmockedFunction should log into console', () => {
    const mLog = jest.spyOn(console, 'log');

    unmockedFunction();

    expect(mLog).toBeCalled();
  });
});
