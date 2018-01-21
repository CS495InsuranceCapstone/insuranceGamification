import { EventApprover } from '../../app/backend/event/eventapprover';
import { RandomEventLoader } from '../../app/backend/event/eventloader';
import { Persona } from '../../app/backend/persona/persona';

describe('Event Approver', () => {

  let randomEventLoader = new RandomEventLoader();
  let persona = new Persona('Nick Smith', 'M', 21, 'single', 0, 'student', .78, 12000);
  let eventApprover1 = new EventApprover(randomEventLoader.getNegativeEventList()[0]);
  let eventApprover2 = new EventApprover(randomEventLoader.getPositiveEventList()[0]);
  let eventApprover3 = new EventApprover(randomEventLoader.getPositiveEventList()[2]);

  it('should approve event which has all passing flags', () => {
    expect(eventApprover1.approve(persona)).toBeTruthy;
  });

  it('should disapprove event which has all failing flags', () => {
    expect(eventApprover2.approve(persona)).toBeFalsy;
  });

  it('should disapprove event which has one failing flag', () => {
    expect(eventApprover3.approve(persona)).toBeFalsy;
  });

});
