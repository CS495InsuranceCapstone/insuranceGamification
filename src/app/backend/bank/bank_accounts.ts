class BankAccount {

  protected balance: number = 0;

  withdraw(amount: number): number {
    if (amount > this.balance) {
      throw new RangeError();
    } else {
      this.balance -= amount;
      return amount;
    }
  }

  deposit(amount: number): void {
    this.balance += amount;
  }

  getBalance(): number {
    return this.balance;
  }

}

export class CheckingAccount extends BankAccount {}

export class SavingsAccount extends BankAccount {

  private interestRate = 0.05;
  private NUM_MONTHS = 12;

  // Compund interest
  appreciate(): void {
    this.balance =
      this.balance * (1 + this.interestRate / this.NUM_MONTHS) ** 12;
  }

}
