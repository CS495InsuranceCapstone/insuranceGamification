import { LifeInsurancePolicy } from './lifeinsurance'
import { Persona } from '../persona/persona'

class TermLifeInsurancePolicy extends LifeInsurancePolicy {

  premium: number;
  term: number;
  persona: Persona;
  private prewriteClass: PrewriteClass;

  constructor(persona: Persona, desiredDeathPayOut: number) {
    super(persona, desiredDeathPayOut);
  }

  premiumChoice(): void{
    if(this.term == 10){
      this.update(10);
    }else if(this.term == 15){
      this.update(15);
    }else if(this.term == 20){
      this.update(20);
    }else if(this.term == 30){
      this.update(30);
    }
  }

  private update(choice: number): void{
    if(choice == 10){
      if(this.persona.age >=20 && this.persona.age <= 80){
        this.premium = (this.setPremium()/34);//Started at 29 but add 5 (e.g 7-2).
      }else{
        this.premium = 0;
      }
    }else if(choice == 15){
      if(this.persona.age >=20 && this.persona.age <= 70){
        this.premium = (this.setPremium()/29);//Started at 22 but add 7 (e.g 9-2).
      }else{
        this.premium = 0;
      }
    }else if(choice == 20){
      if(this.persona.age >=20 && this.persona.age <= 60){
        this.premium = (this.setPremium()/22);//Started at 13 but add 9.
      }else{
        this.premium = 0;
      }
    }else if(choice ==30){
      if(this.persona.age >=20 && this.persona.age <= 55){
        this.premium = (this.setPremium()/13);//Start at 13.
      }else{
        this.premium = 0;      
      }
    }  
  }

  setPremium(): number{
    let sexMult = this.persona.sex == 'M' ? 1.5 : 1;
    let ageMult = (this.persona.age / 10) ** 2
    let classMult = this.prewriteClass / 3;
    return this.premium = 1000 * sexMult * ageMult * classMult;
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

  

  protected definePolicy(): void {
    // TODO: Use passed persona to calculate policy pieces
    this.setPremium();
    this.setPrewriteClass();
    this.endPremium();
  }
}

export enum PrewriteClass {
  Preferred = 1,
  NotSoPreferred = 2,
  Okay = 3,
  Bad = 4
}
