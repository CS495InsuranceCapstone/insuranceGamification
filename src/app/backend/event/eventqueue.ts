export class EventQueue {
  event: Event;
  next: EventQueue;

  constructor(event) {
    this.event = event;
    this.next = null;
  }

  add(nextEvent) {
    if (this.next != null) {
      this.next = new EventQueue(nextEvent);
    } else {
      this.next.add(nextEvent);
    }
  }

  getNextEvent() {
    var retEvent = this.event;
    this.moveUp();
    return retEvent;
  }

  moveUp() {
    if (this.next != null) {
      this.event = this.next.event;
      this.next = this.next.next;
      this.next.moveUp();
    }
  }
}
