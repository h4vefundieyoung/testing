import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    const values = [1, 2, 3];
    const linkedList = generateLinkedList(values);
    const expectedOutput = {
      value: 1,
      next: {
        value: 2,
        next: {
          value: 3,
          next: {
            value: null,
            next: null,
          },
        },
      },
    };
    expect(linkedList).toStrictEqual(expectedOutput);
  });

  test('should generate linked list from values 2', () => {
    const values = [4, 5, 6];
    expect(generateLinkedList(values)).toMatchSnapshot();
  });
});
