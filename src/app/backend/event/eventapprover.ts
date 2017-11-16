import { Event } from './event';
import { Persona } from '../persona/persona'

export class EventApprover {

  private event: Event;

  constructor(event) {
    this.event = event;
  }

  approve(persona: Persona): boolean {
    let approved = true;
    for (let flag in this.event.flags) {
      approved = approved && this.event.flags[flag](eval('persona.' + flag))
    }
    return approved;
  }

}
