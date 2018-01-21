import { LifeInsurancePolicy } from './lifeinsurance'
import { Persona } from '../persona/persona'

class WholeLifeInsurancePolicy extends LifeInsurancePolicy {

  private agePremiumPaidTo: number;
  private prewriteClass: PrewriteClass;

  constructor(persona: Persona, desiredDeathPayOut: number, agePremiumPaidTo: number) {
    super(persona, desiredDeathPayOut);
    this.agePremiumPaidTo = agePremiumPaidTo;
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

}

enum PrewriteClass {
  Preferred,
  NotSoPreferred,
  Okay,
  Bad
}
