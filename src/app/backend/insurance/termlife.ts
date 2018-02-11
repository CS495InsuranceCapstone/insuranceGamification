import { LifeInsurancePolicy } from './lifeinsurance'
import { Persona } from '../persona/persona'

export class TermLifeInsurancePolicy extends LifeInsurancePolicy {

  premium: number;
  term: number;
  persona: Persona;

  constructor(persona: Persona, desiredDeathPayOut: number) {
    super(persona, desiredDeathPayOut);
  }

  premiumChoice(): void{
    if(this.term == 20){
      this.update(20);
    }else if(this.term == 30){
      this.update(30);
    }
  }

  private update(choice: number): void{
    if(choice == 20){
      if(this.persona.age >=20 && this.persona.age <= 60){
        this.premium++;
      }else{
        this.premium = 0;
      }
    }else if(choice ==30){
      if(this.persona.age >=20 && this.persona.age <= 55){
        this.premium++;
      }else{
        this.premium = 0;
      }
    }
  }

  setPremium(){
    //No clear calculations on term life insurance.
    let gender = this.persona.sex;
    let age = this.persona.age;
    let health = this.persona.health;
  }

  endPremium(){
    let end = this.term;
    for(let i = 0; i < end; i++){
      //should loop through the years and end when the term is up.
    }
  }

  payPremium(): void {
    super.payPremium();
    this.premiumChoice();
  }

  protected definePolicy(): void {
    this.title = 'Term';
    // TODO: Use passed persona to calculate policy pieces
    this.setPremium();
    this.endPremium();
  }

  get value(): number {
    return this.deathPayOut;
  }

}
