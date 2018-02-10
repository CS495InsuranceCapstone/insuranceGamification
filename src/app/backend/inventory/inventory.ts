import { LifeInsurancePolicy } from '../insurance/lifeinsurance';

export class Inventory{

    protected lifeInsurance: LifeInsurancePolicy;

    constructor(insurance: LifeInsurancePolicy){
        this.lifeInsurance = insurance;
    }

    get insurance(): LifeInsurancePolicy{
        return this.lifeInsurance;
    }

    set insurance(insurances: LifeInsurancePolicy){
        this.lifeInsurance = insurances;
    }

}
