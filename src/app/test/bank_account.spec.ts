import { SavingsAccount, CheckingAccount } from '../../app/backend/bank/bank_accounts';

describe('Savings Account', () => {

  let account = new SavingsAccount();

  beforeEach(() => {
    if (account.getBalance() > 0) {
      account.withdraw(account.getBalance());
    }
  });

  it('should have balance of 100 when 100 is deposited.', () => {
    account.deposit(100);
    expect(account.getBalance()).toBe(100);
  });

  it('should have a balance of 150.25 when 125 is deposited, and then 25.25 is deposited', () => {
    account.deposit(125);
    account.deposit(25.25);
    expect(account.getBalance()).toBe(150.25);
  });

  it('should not accept a negative argument for deposit.', () => {
    expect(() => account.deposit(-1)).toThrow(RangeError());
  });

  it('should not accept a negative argument for withdraw.', () => {
    expect(() => account.withdraw(-1)).toThrow(RangeError());
  });

  it('should not accept a 0 argument for deposit.', () => {
    expect(() => account.deposit(0)).toThrow(RangeError());
  });

  it('should not accept a 0 argument for withdraw.', () => {
    expect(() => account.withdraw(0)).toThrow(RangeError());
  });

  it('should return 50 when withdraw(50) is called and at least 50 is in the account', () => {
    account.deposit(100);
    expect(account.withdraw(50)).toBe(50);
  });

  it('should subtract 50 from the balance when withdraw(50) is called and at least 50 is in the account', () => {
    account.deposit(100);
    account.withdraw(50);
    expect(account.getBalance()).toBe(50);
  });

  it('should havea balance of 25 if 50, then 25 is withdrawn from a 100 account', () => {
    account.deposit(100);
    account.withdraw(25);
    account.withdraw(50);
    expect(account.getBalance()).toBe(25);
  });

  it('should have a value of 100.05 after a year of appreciation if the starting balance is 100', () => {
    account.deposit(100);
    account.appreciate();
    expect(account.getBalance()).toBe(105.12);
  });

});
