import { Event } from './event';
import { Persona } from '../persona/persona'

export class EventApprover {

  private persona: Persona;

  constructor(persona) {
    this.persona = persona;
  }

  approve(event: Event): boolean {
    let approved = true;
    for (let flag in event.flags) {
      approved = approved && event.flags[flag](eval('persona.' + flag))
    }
    return approved;
  }

}
