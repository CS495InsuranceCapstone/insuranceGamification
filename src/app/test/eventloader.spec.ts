import { RandomEventLoader } from '../backend/event/eventloader'
import { RandomEvent } from '../backend/event/event'

describe('RandomEventLoader', () => {

  let eventLoader: RandomEventLoader;

  beforeEach(() => {
    eventLoader = new RandomEventLoader();
  });

  it('should get positive event of proper index', () => {
    expect(JSON.stringify(eventLoader.getPositiveEvent(0))).toBe(JSON.stringify(new RandomEvent(
      "{Billy Johnson}",
      "{You have just gotten a 10% bonus from work. How will you handle the extra money you have just recieved?}",
      "{https://www.wikihow.com/images/c/c7/Raise-Money-Step-30.jpg}"
    )));
  });

  it('should get negative event of proper index', () => {
    expect(JSON.stringify(eventLoader.getNegativeEvent(0))).toBe(JSON.stringify(new RandomEvent(
      "{Billy Johnson}",
      "{You have gotten into a car accident, that has left your car completely damaged! How will you handle this terrible situation?}",
      "{https://familydoctor.org/wp-content/uploads/2000/09/24611539_l-705x470.jpg}"
    )));
  });

  it('should no longer hold random event after it\'s been retrieved', () => {
    let event = eventLoader.getRandomEvent();
    expect(eventLoader.positiveEvents.includes(event) ||
           eventLoader.negativeEvents.includes(event)).toBe(false);
  });

});
