import { LifeInsurancePolicy } from '../insurance/lifeinsurance';
import { WholeLifeInsurancePolicy } from '../insurance/wholelifeinsurance';
import { TermLifeInsurancePolicy } from '../insurance/termlife';
import { UnusableError } from '../util/loss_exception'

export class Inventory{

    private autoInsurance = new AutoInsurance();
    private healthInsurance = new HealthInsurance();
    private homeOwnersInsurnace = new HomeOwnersInsurance();

    useAutoInsurance(): void {
      this.useInsurance(this.autoInsurance);
    }

    useHealthInsurance(): void {
      this.useInsurance(this.healthInsurance);
    }

    useHomeOwnersInsurance(): void {
      this.useInsurance(this.homeOwnersInsurnace);
    }

    useInsurance(policy: InsurancePolicy): void {
      if (policy.isEnabled) policy.isEnabled = false;
      else throw new UnusableError();
    }

    buyInsurance(policy: InsurancePolicy, checkingAccountBalance: number): number {
      if (policy.isEnabled || policy.cost > checkingAccountBalance) return 0
      else {
        policy.isEnabled = true;
        return policy.cost;
      }
    }

}

class InsurancePolicy {
  isEnabled: Boolean
  cost: number
}

class AutoInsurance extends InsurancePolicy {
  isEnabled = false;
  cost = 2000;
}

class HealthInsurance extends InsurancePolicy {
  isEnabled = false;
  cost = 20000;
}

class HomeOwnersInsurance extends InsurancePolicy {
  isEnabled = false;
  cost = 25000;
}
