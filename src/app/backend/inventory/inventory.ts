import { LifeInsurancePolicy } from '../insurance/lifeinsurance';
import { WholeLifeInsurancePolicy } from '../insurance/wholelifeinsurance';
import { TermLifeInsurancePolicy } from '../insurance/termlife';

export class Inventory{

    private hasAutoInsurance: Boolean;
    private hasHealthInsurance: Boolean;
    private hasHomeOwnersInsurance: Boolean;

    get autoInsurnace(): Boolean {
      return this.hasAutoInsurance;
    }

    get healthInsurnace(): Boolean {
      return this.hasHealthInsurance;
    }

    get homeOwnersInsurance(): Boolean {
      return this.hasHomeOwnersInsurance;
    }

    set autoInsurnace(hasAutoInsurance: Boolean) {
      this.hasAutoInsurance = hasAutoInsurance;
    }

    set healthInsurnace(hasHealthInsurance: Boolean) {
      this.hasHealthInsurance = hasHealthInsurance
    }

    set homeOwnersInsurance(hasHomeOwnersInsurance: Boolean) {
      this.hasHomeOwnersInsurance = hasHomeOwnersInsurance;
    }

}
