import { LifeInsurancePolicy } from '../insurance/lifeinsurance';
import { WholeLifeInsurancePolicy } from '../insurance/wholelifeinsurance';
import { TermLifeInsurancePolicy } from '../insurance/termlife';

export class Inventory{

    private items: InventoryItem[] = [];

    constructor(){
    }

}

export interface InventoryItem {
  name: String;

  getInfo(): string;
}
