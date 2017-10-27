import { Event, RandomEvent } from './event'
import { RandomEventLoader, PredefinedEventLoader } from './eventloader'

export class EventQueue {
  event: Event;
  next: EventQueue;
  length: number;

  constructor(event: Event) {
    this.event = event;
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

  getNextEvent(): Event {
    let retEvent = this.event;
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

}

export class EventQueueBuilder {

  private randomLoader: RandomEventLoader;
  private predefinedLoader: PredefinedEventLoader;

  constructor() {
    this.refresh();
  }

  private refresh(): void {
    this.randomLoader = new RandomEventLoader();
    this.predefinedLoader = new PredefinedEventLoader();
  }

  build(): EventQueue {
    let queue: EventQueue;
    queue.addEvent(this.randomLoader.getNextEvent());
    for (let i = 0; i < 3; i++) {
      queue.addEvent(this.randomLoader.getNextEvent());
    }

    return queue;
  }

}
