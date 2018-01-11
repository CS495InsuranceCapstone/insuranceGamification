class BankAccount {

  private balance: number = 0;

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
