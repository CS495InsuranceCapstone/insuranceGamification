import { LifeInsurancePolicy } from './lifeinsurance'
import { Persona } from '../persona/persona'

export class WholeLifeInsurancePolicy extends LifeInsurancePolicy {

  private agePremiumPaidTo: number;
  private prewriteClass: PrewriteClass;
  private cashValue: number;
<<<<<<< HEAD:src/app/backend/insurance/wholelifeinsurance.ts
=======
  private policyAge: number;
  private loanAmount: number = 0;
>>>>>>> insurance:src/app/backend/insurance/wholelifeinsurnace.ts

  constructor(persona: Persona, desiredDeathPayOut: number, agePremiumPaidTo: number) {
    super(persona, desiredDeathPayOut);
    this.agePremiumPaidTo = agePremiumPaidTo;
    this.cashValue = 0;
  }

  protected definePolicy(): void {
    this.title = "Whole Life";
    this.setPrewriteClass();
    this.setPremium();
  }

  private setPremium() {
    let sexMult = this.persona.sex == 'M' ? 1.5 : 1;
    let ageMult = (this.persona.age / 10) ** 2
    let classMult = this.prewriteClass / 2;
    this.premium = 1000 * sexMult * ageMult * classMult;
  }

  private setPrewriteClass(): void {
    if (this.persona.health < .25) {
      this.prewriteClass = PrewriteClass.Bad
    } else if (this.persona.health >= .25 && this.persona.health < .5) {
      this.prewriteClass = PrewriteClass.Okay;
    } else if (this.persona.health >= .5 && this.persona.health < .75) {
      this.prewriteClass = PrewriteClass.NotSoPreferred;
    } else {
      this.prewriteClass = PrewriteClass.Preferred;
    }
  }

  payPremium(): void {
    super.payPremium();
    this.updatePolicy();
  }

  private updatePolicy(): void {
    this.appreciate();
    this.policyAge++;
    if (this.persona.age >= this.agePremiumPaidTo) {
      this.premium = 0;
    }
  }

  private appreciate(): void {
    let ageMult = this.policyAge <= 1 ? 0 : 1
    this.cashValue = (this.premium / 3 + this.cashValue * 1.01) * ageMult;
  }

  payOut(): number {
    console.log(this.cashValue, this.deathPayOut)
    return this.cashValue * 3.2 + this.deathPayOut;
  }

  getDividend(): number {
    return Math.random() / 10 * this.cashValue;
  }

<<<<<<< HEAD:src/app/backend/insurance/wholelifeinsurance.ts
  get value(): number {
    return this.cashValue;
  }

=======
  takeLoan(collateralAmount: number): number {
    this.loanAmount += collateralAmount;
    this.cashValue -= this.loanAmount;
    return collateralAmount
  }

  payLoan(amountToPay: number): number {
    this.loanAmount -= amountToPay;
    if (this.loanAmount < 0) {
      return this.giveChange();
    }
    return 0;
  }

  private giveChange(): number {
    let returnAmt = -this.loanAmount;
    this.loanAmount = 0;
    return returnAmt;
  }

  getCashValue(): number {
    return this.cashValue;
  }

  getPrewriteClass(): PrewriteClass {
    return this.prewriteClass;
  }

  getLoanAmount(): number {
    return this.loanAmount;
  }

>>>>>>> insurance:src/app/backend/insurance/wholelifeinsurnace.ts
}

export enum PrewriteClass {
  Preferred = 1,
  NotSoPreferred = 2,
  Okay = 3,
  Bad = 4
}
