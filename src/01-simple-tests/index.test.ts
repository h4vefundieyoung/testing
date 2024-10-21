import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    expect(simpleCalculator({ a: 2, b: 8, action: Action.Add })).toBe(10);
  });

  test('should subtract two numbers', () => {
    expect(simpleCalculator({ a: 2, b: 8, action: Action.Subtract })).toBe(-6);
  });

  test('should multiply two numbers', () => {
    expect(simpleCalculator({ a: 8, b: 2, action: Action.Multiply })).toBe(16);
  });

  test('should divide two numbers', () => {
    expect(simpleCalculator({ a: 8, b: 2, action: Action.Divide })).toBe(4);
  });

  test('should exponentiate two numbers', () => {
    expect(simpleCalculator({ a: 8, b: 2, action: Action.Exponentiate })).toBe(
      64,
    );
  });

  test('should return null for invalid action', () => {
    expect(
      simpleCalculator({ a: 8, b: 2, action: 'invalid action' }),
    ).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    expect(
      simpleCalculator({ a: 'invalid', b: 'invalid', action: Action.Divide }),
    ).toBeNull();
  });
});
