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
      avatar: HTMLImageElement;
      inventory: Inventory;
      insurancePolicy: LifeInsurancePolicy;
      //TODO: Get avatars for each avatar and create associations for them in JSON

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
                  health: number,
                  avatar: HTMLImageElement = null) {
        this.name = name;
        this.sex = sex;
        this.age = age;
        this.maritalStatus = maritalStatus;
        this.dependents = dependents;
        this.profession = profession;
        this.salary = salary;
        this.health = health;
        this.avatar = avatar;
        this.inventory = new Inventory();
      }

      convertFieldsFromJSON(): void {
        this.age = +this.age;
        this.dependents = +this.dependents;
        this.salary = +this.salary;
        this.health = +this.health;
        this.avatar = null;
      }

    }
