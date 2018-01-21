import { LifeInsurancePolicy } from './lifeinsurance'
import { Persona } from '../persona/persona'

class WholeLifeInsurancePolicy extends LifeInsurancePolicy {

  private agePremiumPaidTo: number;
  private prewriteClass: PrewriteClass;
  private cashValue: number;
  private policyAge: number;

  constructor(persona: Persona, desiredDeathPayOut: number, agePremiumPaidTo: number) {
    super(persona, desiredDeathPayOut);
    this.agePremiumPaidTo = agePremiumPaidTo;
    this.cashValue = 0;
    this.policyAge = 1;
  }

  protected definePolicy(): void {
    this.setPrewriteClass();
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
    this.appreciate();
    this.policyAge++;
    if (this.persona.age >= this.agePremiumPaidTo) {
      this.premium = 0;
    }
  }

  private appreciate(): void {
    this.cashValue = (this.cashValue + this.premium) ** (this.policyAge / 50);
  }

}

enum PrewriteClass {
  Preferred,
  NotSoPreferred,
  Okay,
  Bad
}
