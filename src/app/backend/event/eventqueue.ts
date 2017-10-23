import { Event, RandomEvent } from './event'

export class EventQueue {
  event: Event;
  next: EventQueue;
  length: number;

  constructor(event) {
    this.event = event;
    this.next = null;
    this.length = 1
  }

  addEvent(nextEvent): void {
    if (this.next == null) {
      this.next = new EventQueue(nextEvent);
    } else {
      this.next.addEvent(nextEvent);
    }
    this.length++;
  }

  addEvents(nextEvents): void {
    nextEvents.forEach((event) => this.addEvent(event))
  }

  getNextEvent(): Event {
    var retEvent = this.event;
    this.moveUp();
    return retEvent;
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
    this.next = this.next.next;
  }

}
