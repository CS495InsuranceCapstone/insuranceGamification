import { RandomEventLoader, PredefinedEventLoader } from '../backend/event/eventloader'
import { RandomEvent, PredefinedEvent } from '../backend/event/event'
import { Persona } from '../backend/persona/persona'
import { Counteraction } from '../backend/event/counteraction'

describe('RandomEventLoader', () => {

  let eventLoader: RandomEventLoader;
  let persona = new Persona('Nick Smith', 'M', 21, 'single', 0, 'student', .78, 12000);

  beforeEach(() => {
    eventLoader = new RandomEventLoader(persona);
  });

  it('should get positive event of proper index', () => {
    let event = new RandomEvent(
      "Your Bonus Check!",
      "You have just gotten a 10% bonus from work. How will you handle the extra money you have just recieved?",
      "https://www.wikihow.com/images/c/c7/Raise-Money-Step-30.jpg"
    );
    event.flags = {"age":x => x > 25, "salary": x => x > 40000};
    event.counteractions = [
      {"name": "Placeholder", "counteractionString": "() => this.persona.name;"} as Counteraction,
      {"name": "", "counteractionString": "() => this.persona.name;"} as Counteraction,
      {"name": "", "counteractionString": "() => this.persona.name;"} as Counteraction
    ]
    expect(JSON.stringify(eventLoader.getPositiveEvent(0))).toBe(JSON.stringify(event));
  });

  it('should get negative event of proper index', () => {
    let event = new RandomEvent(
      "Car Accident",
      "You have gotten into a car accident, that has left your car completely damaged! How will you handle this terrible situation?",
      "https://familydoctor.org/wp-content/uploads/2000/09/24611539_l-705x470.jpg"
    );
    event.flags = {"age": x => x < 25, "salary": x => x < 60000};
    event.counteractions = [
      {"name": "Placeholder", "counteractionString": "() => this.persona.name;"} as Counteraction,
      {"name": "", "counteractionString": "() => this.persona.name;"} as Counteraction,
      {"name": "", "counteractionString": "() => this.persona.name;"} as Counteraction
    ]
    expect(JSON.stringify(eventLoader.getNegativeEvent(0))).toBe(JSON.stringify(event));
  });

  it('should no longer hold random event after it\'s been retrieved', () => {
    let event = eventLoader.getNextEvent();
    expect(eventLoader.getPositiveEventList().includes(event) ||
           eventLoader.getNegativeEventList().includes(event)).toBe(false);
  });

});


describe('PredefinedEventLoader', () => {

  let eventLoader: PredefinedEventLoader;
  let persona = new Persona('Nick Smith', 'M', 21, 'single', 0, 'student', .78, 12000);

  beforeEach(() => {
    eventLoader = new PredefinedEventLoader(persona);
  });

  it('should give a event when getNextEvent() is called', () => {
    let event =new PredefinedEvent(
      "Sign the Deed",
      "You just made the biggest purchase of your life! Congratulations on the purchase of your new house. How will you handle the upcoming costs?",
      "null"
    );
    event.flags = {};
    event.counteractions = [
      {"name": "Placeholder", "counteractionString": "() => this.persona.checkingAccount.deposit(4200)"} as Counteraction,
      {"name": "Placeholder", "counteractionString": "() => this.persona.name;"} as  Counteraction,
      {"name": "Placeholder", "counteractionString": "() => this.persona.name;"} as Counteraction
    ]
    expect(JSON.stringify(eventLoader.getNextEvent())).toBe(JSON.stringify(event));
  });

  it('should remove an event from the loader after it\'s been returned', () => {
    let event = eventLoader.getNextEvent();
    expect(eventLoader.getEventList().includes(event)).toBe(false);
  });

});
