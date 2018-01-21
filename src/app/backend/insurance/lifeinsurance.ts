import { Persona } from '../persona/persona'

export abstract class LifeInsurancePolicy {

  protected persona: Persona;
  protected deathPayOut: number;
  protected premium: number;

  constructor(persona: Persona, desiredDeathPayOut: number) {
    this.persona = persona;
    this.deathPayOut = desiredDeathPayOut;
    this.definePolicy();
  }

  protected abstract definePolicy(): void;

  payOut(): number {
    return this.deathPayOut;
  }

  payPremium(): void {
    this.persona.checkingAccount.withdraw(this.premium);
  }

}
