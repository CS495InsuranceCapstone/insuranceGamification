import { EventQueue } from '../backend/event/eventqueue'
import { RandomEvent } from '../backend/event/event'

describe('EventQueue', () => {

  let event1 : RandomEvent;
  let event2 : RandomEvent;
  let event3 : RandomEvent;
  let remainingEvents : RandomEvent[];
  let eventQueue : EventQueue;

  beforeEach(() => {
    event1 = new RandomEvent('Event 1', 'Event 1 has happened', null);
    event2 = new RandomEvent('Event 2', 'Event 2 has happened', null);
    event3 = new RandomEvent('Event 3', 'Event 3 has happened', null);
    remainingEvents = [event2, event3];
    eventQueue = new EventQueue(event1);
  });

  it('should have a length of 1 after creation with event 1', () => {
    expect(eventQueue.length).toBe(1);
  });

  it('should have a length of 2 after adding event 2', () => {
    eventQueue.addEvent(event2);
    expect(eventQueue.length).toBe(2);
  });

  it('should have a length of 3 after adding all events', () => {
    eventQueue.addEvents(remainingEvents);
    expect(eventQueue.length).toBe(3);
  });

  it('should return event1 after getNextEvent() is called once', () => {
    eventQueue.addEvents(remainingEvents);
    expect(eventQueue.getNextEvent()).toBe(event1);
  });

  it('should return event2 after getNextEvent() is called twice', () => {
    eventQueue.addEvents(remainingEvents);
    removeNEvents(eventQueue, 1);
    expect(eventQueue.getNextEvent()).toBe(event2);
  });

  it('should return event3 after getNextEvent() is called thrice', () => {
    eventQueue.addEvents(remainingEvents);
    removeNEvents(eventQueue, 2);
    expect(eventQueue.getNextEvent()).toBe(event3);
  });

  it('should have a length of 2 after adding all events and removing 1', () => {
    eventQueue.addEvents(remainingEvents);
    removeNEvents(eventQueue, 1);
    expect(eventQueue.length).toBe(2);
  });

  it('should have a length of 1 after adding all events and removing 2', () => {
    eventQueue.addEvents(remainingEvents);
    removeNEvents(eventQueue, 2);
    expect(eventQueue.length).toBe(1);
  });

  it('should have a +1 length after inserting', () => {
    eventQueue.addEvent(event2);
    eventQueue.insert(event3, 1);
    expect(eventQueue.length).toBe(3)
  });

  it('should have event3 at index 1 if it is inserted at index 1', () => {
    eventQueue.addEvent(event2);
    eventQueue.insert(event3, 1);
    eventQueue.getNextEvent();
    expect(eventQueue.getNextEvent()).toBe(event3);
  });

});

function removeNEvents(eventQueue: EventQueue, n: number): void {
  for (n; n > 0; n--) {
    eventQueue.getNextEvent();
  }
}
