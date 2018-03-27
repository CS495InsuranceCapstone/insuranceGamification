import { Persona } from '../persona/persona'

export class Counteraction {

  private persona: Persona;

  counteraction: () => void;

  constructor(name: string, counteraction: () => void) {
    this.counteraction = counteraction;
  }

  set personaInstance(persona: Persona) {
    this.persona = persona;
  }

}
