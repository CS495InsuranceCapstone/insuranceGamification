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
    // TODO: Use passed persona to calculate policy pieces
  }

}

enum PrewriteClass {
  Preferred,
  NotSoPreferred,
  Okay,
  Bad
}
