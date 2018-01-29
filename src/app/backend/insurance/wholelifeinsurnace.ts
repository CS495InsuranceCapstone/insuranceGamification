import { LifeInsurancePolicy } from './lifeinsurance'
import { Persona } from '../persona/persona'

class WholeLifeInsurancePolicy extends LifeInsurancePolicy {

  private agePremiumPaidTo: number;
  private prewriteClass: PrewriteClass;
  private cashValue: number;
  private policyAge: number;
  private loanAmount: number;

  constructor(persona: Persona, desiredDeathPayOut: number, agePremiumPaidTo: number) {
    super(persona, desiredDeathPayOut);
    this.agePremiumPaidTo = agePremiumPaidTo;
    this.cashValue = 0;
    this.policyAge = 1;
  }

  protected definePolicy(): void {
    this.setPrewriteClass();
    this.setPremium();
  }

  private setPremium() {
    let sexMult = this.persona.sex == 'M' ? 1.5 : 1;
    let ageMult = (this.persona.age / 100) ** 2
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
    this.cashValue = (this.cashValue + this.premium) ** (this.policyAge / 50);
  }

  getDividend(): number {
    return Math.random() / 10 * this.cashValue;
  }

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

}

enum PrewriteClass {
  Preferred,
  NotSoPreferred,
  Okay,
  Bad
}
