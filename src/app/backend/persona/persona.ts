import { CheckingAccount, SavingsAccount } from '../bank/bank_accounts'
import { Inventory } from '../inventory/inventory'
import { LifeInsurancePolicy } from '../insurance/lifeinsurance'

export class Persona {

      name: string;
      sex: string;
      age: number;
      maritalStatus: string;
      dependents: number;
      profession: string;
      salary: number;
      health: number;
      avatar: string;
      inventory: Inventory;
      insurancePolicy: LifeInsurancePolicy;
      checkingAccount: CheckingAccount;
      savingsAccount: SavingsAccount;

      // + operator converts string to number
      constructor(name: string,
                  sex: string,
                  age: number,
                  maritalStatus: string,
                  dependents: number,
                  profession: string,
                  salary: number,
                  health: number) {
        this.name = name;
        this.sex = sex;
        this.age = age;
        this.maritalStatus = maritalStatus;
        this.dependents = dependents;
        this.profession = profession;
        this.salary = salary;
        this.health = health;
        this.inventory = new Inventory();
        this.checkingAccount = new CheckingAccount();
        this.savingsAccount = new SavingsAccount();
      }

      convertFieldsFromJSON(): void {
        this.age = +this.age;
        this.dependents = +this.dependents;
        this.salary = +this.salary;
        this.health = +this.health;
      }

      setCheckingAccount(account: CheckingAccount): void {
        this.checkingAccount = account;
      }

      passYear(): void {
        this.checkingAccount.deposit(this.salary - 10000 * (1 + this.dependents));
        if (this.savingsAccount) this.savingsAccount.appreciate();
        this.age++;
        this.insurancePolicy.payPremium();
      }

    }
