export class EventQueue {
  event: Event;
  next: EventQueue;
  length: number;

  constructor(event) {
    this.event = event;
    this.next = null;
    this.length = 1
  }

  add(nextEvent) {
    if (this.next != null) {
      this.next = new EventQueue(nextEvent);
    } else {
      this.next.add(nextEvent);
    }
    this.length++;
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
    this.length--;
  }
}
