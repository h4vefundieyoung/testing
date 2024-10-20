import {
  getBankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
} from '.';

interface IInitial {
  balance: number;
  recepient: ReturnType<typeof getBankAccount>;
  donor: ReturnType<typeof getBankAccount>;
}

describe('BankAccount', () => {
  let init: IInitial;

  beforeEach(() => {
    init = {
      balance: 777,
      recepient: getBankAccount(777),
      donor: getBankAccount(777),
    };
  });

  test('should create account with initial balance', () => {
    const { donor, balance } = init;
    expect(donor.getBalance()).toBe(balance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const { donor, balance } = init;
    expect(() => donor.withdraw(balance + 1)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const { donor, recepient, balance } = init;
    expect(() => donor.transfer(balance * 2, recepient)).toThrow();
  });

  test('should throw error when transferring to the same account', () => {
    const { donor, balance } = init;
    expect(() => donor.transfer(balance, donor)).toThrow();
  });

  test('should deposit money', () => {
    const { donor, balance } = init;
    const depositValue = 55;
    expect(donor.deposit(depositValue).getBalance()).toBe(
      balance + depositValue,
    );
  });

  test('should withdraw money', () => {
    const { donor, balance } = init;
    const withdrawAmount = 55;
    expect(donor.withdraw(withdrawAmount).getBalance()).toBe(
      balance - withdrawAmount,
    );
  });

  test('should transfer money', () => {
    const { donor, recepient, balance } = init;
    donor.transfer(balance, recepient);
    expect(donor.getBalance()).toBe(0);
    expect(recepient.getBalance()).toBe(balance * 2);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const { donor } = init;
    try {
      const data = await donor.fetchBalance();
      expect(typeof data === 'number').toBeTruthy();
    } catch (e) {
      expect(e instanceof Error).toBeTruthy();
    }
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const { donor, balance } = init;
    try {
      await donor.synchronizeBalance();
      expect(donor.getBalance() !== balance).toBeTruthy();
    } catch (e) {
      expect(e instanceof Error).toBeTruthy();
    }
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const { donor, balance } = init;
    try {
      await donor.synchronizeBalance();
      expect(donor.getBalance() !== balance).toBeTruthy();
    } catch (e) {
      expect(e instanceof SynchronizationFailedError).toBeTruthy();
    }
  });
});
