import { UnusableError } from '../util/loss_exception'

class BankAccount {

  protected balance: number = 0;

  withdraw(amount: number): number {
    if (amount > this.balance || amount <= 0) {
      throw new UnusableError();
    } else {
      this.balance -= amount;
      return amount;
    }
  }

  deposit(amount: number): void {
    if (amount <= 0) {
      throw new RangeError();
    } else {
      this.balance += amount;
    }
  }

  getBalance(): number {
    return this.balance;
  }

}

export class CheckingAccount extends BankAccount {}

export class SavingsAccount extends BankAccount {

  private interestRate = 0.05;
  private NUM_MONTHS = 12;

  // Compound interest
  appreciate(): void {
    this.balance = +(this.balance * (1 + this.interestRate / this.NUM_MONTHS) ** this.NUM_MONTHS).toFixed(2);
  }

}
