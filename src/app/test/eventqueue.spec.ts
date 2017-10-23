import { EventQueue } from '../backend/event/eventqueue'
import { RandomEvent } from '../backend/event/randomevent'

describe('EventQueue tests', () => {

  let event1 : RandomEvent
  let event2 : RandomEvent
  let event3 : RandomEvent
  let eventqueue : EventQueue

  beforeEach(() => {
    event1 = new RandomEvent('Event 1', 'Event 1 has happened', null)
    event2 = new RandomEvent('Event 2', 'Event 2 has happened', null)
    event3 = new RandomEvent('Event 3', 'Event 3 has happened', null)
    eventqueue = new EventQueue(event1)
  })

  it('should have a length of 1 after creation with event 1', () => {
    expect(eventqueue.length).toBe(1)
  })
});
