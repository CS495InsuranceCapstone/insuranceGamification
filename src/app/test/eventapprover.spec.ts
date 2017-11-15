import { EventApprover } from '../../app/backend/event/eventapprover';
import { RandomEventLoader } from '../../app/backend/event/eventloader';
import { Persona } from '../../app/backend/persona/persona';

describe('Event Approver', () => {

  let persona = new Persona('Nick Smith', 'M', 21, 'single', 0, 'student', 12000);
  let eventApprover = new EventApprover(persona);
  let randomEventLoader = new RandomEventLoader();
  let event1 = randomEventLoader.getNegativeEventList()[0]
  let event2 = randomEventLoader.getPositiveEventList()[0]
  let event3 = randomEventLoader.getPositiveEventList()[2]

  it('should approve event which has all passing flags', () => {
    expect(eventApprover.approve(event1)).toBeTruthy;
  });

  it('should disapprove event which has all failing flags', () => {
    expect(eventApprover.approve(event2)).toBeFalsy;
  });

  it('should disapprove event which has one failing flag', () => {
    expect(eventApprover.approve(event3)).toBeFalsy;
  });

});
