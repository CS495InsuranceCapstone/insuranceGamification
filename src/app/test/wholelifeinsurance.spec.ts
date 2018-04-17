import { WholeLifeInsurancePolicy, PrewriteClass } from '../backend/insurance/wholelifeinsurance'
import { Persona } from '../backend/persona/persona'
import { CheckingAccount } from '../backend/bank/bank_accounts'

describe('Whole Life Insurance Policy', () => {

  let policy: WholeLifeInsurancePolicy;
  let persona: Persona

  beforeEach(() => {
    persona = new Persona('Nick Smith',
                          'M',
                          21,
                          'single',
                          0,
                          'Student',
                          20000,
                          .8);
    persona.setCheckingAccount(new CheckingAccount())
    persona.checkingAccount.deposit(100000000);
    policy = new WholeLifeInsurancePolicy(persona, 150000, 100);
  });

  it('should have 0 cash value when initialized', () => {
    expect(policy.getCashValue()).toBe(0);
  });

  it('should have a prewrite class of "Preferred"', () => {
    expect(policy.getPrewriteClass()).toBe(PrewriteClass.Preferred)
  });

  it('should have a premium of 3307.50', () => {
    expect(policy.getPremium()).toBe(3307.5);
  });

  it('should have a cash value of 0 after 0 years', () => {
    expect(policy.getCashValue()).toBe(0);
  });

  it('should have a cash value of 0 after 1 year.', () => {
    progress(1);
    expect(policy.getCashValue()).toBe(0);
  });

  let progress = (years) => {
    for (let i = 0; i < years; i++) {
      policy.payPremium();
      persona.age++;
    }
  };

  it('should have a cash value of 4476.592102500001 after 5 years', () => {
    progress(5);
    expect(policy.getCashValue()).toBe(4476.592102500001);
  });

  it('should have a cash value of 29738.245000643572 after 25 years', () => {
    progress(25);
    expect(policy.getCashValue()).toBe(29738.245000643572);
  });

  it('should have a cash value of 243820.1053501125 after 80 years', () => {
    progress(80);
    expect(policy.getCashValue()).toBe(131723.12148085827);
  });

  it('should have a dividend between 0 and 4476.592102500001 after 5 years', () => {
    progress(5);
    let div = policy.getDividend();
    expect(div >= 0 && div <= 4476.592102500001).toBeTruthy()
  });

  it('should have a premium of 0 after 80 years', () => {
    progress(80);
    expect(policy.getPremium()).toBe(0);
  });

  it('should have a loan amount of 5000 if one is taken out', () => {
    policy.takeLoan(5000);
    expect(policy.getLoanAmount()).toBe(5000);
  });

  it('should have a loan amount of 4000 if 1000 is paid on a 5000 loan', () => {
    policy.takeLoan(5000);
    policy.payLoan(1000);
    expect(policy.getLoanAmount()).toBe(4000);
  });

  it('should return change if overpaid on loan', () => {
    policy.takeLoan(5000);
    expect(policy.payLoan(5100)).toBe(100);
  });

  it('should have a pay out of 1500000 on year 0', () => {
    expect(policy.payOut()).toBe(150000);
  });

  it('should have a pay out of 164325.094728 on year 5', () => {
    progress(5);
    expect(policy.payOut()).toBe(164325.094728);
  });

});
