import { Persona } from '../persona/persona'

export abstract class LifeInsurancePolicy {

  protected persona: Persona;
  protected deathPayOut: number;
  protected premium: number;

  constructor(persona: Persona) {
    this.persona = persona;
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
