import { LifeInsurancePolicy } from './lifeinsurance'
import { Persona } from '../persona/persona'

class TermLifeInsurancePolicy extends LifeInsurancePolicy {

  premium: number;
  private policyAge: number;
  term: number;
  persona: Persona;

  constructor(persona: Persona, desiredDeathPayOut: number) {
    super(persona, desiredDeathPayOut);
    this.policyAge = 1;
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
        this.setPremium();
      }else{
        this.premium = 0;
      }
    }else if(choice ==30){
      if(this.persona.age >=20 && this.persona.age <= 55){
        this.setPremium();
      }else{
        this.premium = 0;      
      }
    }  
  }

  setPremium(){
    //No clear calculations on term life insurance.
    let gender = this.persona.sex == 'M' ? 1.5 : 1;
    let age = this.persona.age;
    let health = this.persona.health;
  }

  endPremium(){
    let end = this.term;
    let count = 0;
    if(count < end){
      count++;
    }
  }

  payPremium(): void {
    super.payPremium();
    this.premiumChoice();  
  }

  protected definePolicy(): void {
    // TODO: Use passed persona to calculate policy pieces
    this.setPremium();
    this.endPremium();
  }
}
