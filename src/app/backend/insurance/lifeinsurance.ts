import { Persona } from '../persona/persona'

export abstract class LifeInsurancePolicy {

  protected persona: Persona;
  protected deathPayOut: number;
  protected premium: number;
  protected policyAge: number;
  title: string;

  constructor(persona: Persona, desiredDeathPayOut: number) {
    this.persona = persona;
    this.deathPayOut = desiredDeathPayOut;
    this.policyAge = 1;
    this.definePolicy();
  }

  protected abstract definePolicy(): void;

  payOut(): number {
    return this.deathPayOut;
  }

  payPremium(): void {
    this.persona.checkingAccount.withdraw(this.premium);
  }

  get age(): number {
    return this.policyAge;
  }

  get value(): number {
    return 0;
  }

  getPremium(): number {
    return this.premium;
  }

}
