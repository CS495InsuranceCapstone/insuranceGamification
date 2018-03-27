import { Persona } from '../persona/persona'

export class Counteraction {

  name: string
  counteractionString: string;

  set personaInstance(persona: Persona) {
    persona;
  }

  set counter(counteraction: () => void) {
    counteraction;
  }

}
