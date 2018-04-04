import { Persona } from '../persona/persona'

export class Counteraction {

  name: string
  counteractionString: string;
  persona: Persona
  counteraction: () => void;

  evaluate() {
    this.counteraction = eval(this.counteractionString);
  }

  test() {
    console.log("test");
  }

}
