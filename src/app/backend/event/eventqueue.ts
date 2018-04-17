import { Event, RandomEvent } from './event';
import { EventApprover } from './eventapprover';
import { RandomEventLoader, PredefinedEventLoader } from './eventloader';
import { Persona } from '../persona/persona';

const NUMBER_RAND_EVENTS = 10;

export class EventQueue {

  private approver: EventApprover;

  event: Event;
  next: EventQueue;
  length: number;

  constructor(event: Event) {
    this.event = event;
    this.approver = new EventApprover(event);
    this.next = null;
    this.length = 1
  }

  addEvent(nextEvent: Event): void {
    if (this.next == null) {
      this.next = new EventQueue(nextEvent);
    } else {
      this.next.addEvent(nextEvent);
    }
    this.length++;
  }

  addEvents(nextEvents: Event[]): void {
    nextEvents.forEach((event) => this.addEvent(event))
  }

  getNextEvent(persona): Event {
    if (this.approver.approve(persona)) {
      let retEvent = this.event;
      this.moveUp();
      return retEvent;
    } else {
      let moveEvent = this.event;
      this.moveUp();
      this.addEvent(moveEvent);
      return this.getNextEvent(persona);
    }
  }

  private moveUp(): void {
    if (this.next != null && this.next.next != null) {
      this.assignNewProperties();
      this.next.moveUp();
    } else if (this.next != null) {
      this.assignNewProperties();
    }
    this.length--;
  }

  private assignNewProperties(): void {
    this.event = this.next.event;
    this.approver = this.next.approver;
    this.next = this.next.next;
  }

  insert(event: Event, index: number): void {
    if (index === 0) {
      let afterNext = this.next;
      this.next = new EventQueue(event);
      this.next.length = this.length;
      this.next.next = afterNext;
    } else {
      this.length++;
      this.insert(event, index - 1);
    }
  }

  isEmpty(persona: Persona): boolean {
    if (this.next == null && !this.approver.approve(persona)) {
      return true;
    } else if (!this.approver.approve(persona)) {
      return this.next.isEmpty(persona);
    } else {
      return false;
    }
  }

}

export class EventQueueBuilder {

  private randomLoader: RandomEventLoader;
  private predefinedLoader: PredefinedEventLoader;
  private persona: Persona;

  constructor(persona: Persona) {
    this.refresh();
    this.persona = persona;
  }

  private refresh(): void {
    this.randomLoader = new RandomEventLoader(this.persona);
    this.predefinedLoader = new PredefinedEventLoader(this.persona);
  }

  build(): EventQueue {
    let queue = new EventQueue(this.randomLoader.getNextEvent());
    queue.addEvents(this.predefinedLoader.getEventList());
    for (let i = 0; i < NUMBER_RAND_EVENTS; i++) {
      queue.addEvent(this.randomLoader.getNextEvent());
    }
    this.refresh();
    return queue;
  }

}
