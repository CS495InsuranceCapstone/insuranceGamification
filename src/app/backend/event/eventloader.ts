import * as randomdata from './randomevents.json';
import * as predefineddata from './predefinedevents.json';
import { Event, RandomEvent, PredefinedEvent } from './event';
import { Loader } from '../util/loader'
import { Persona } from '../persona/persona'
import { Counteraction } from './counteraction'

class EventLoader extends Loader {

  protected persona: Persona;

  constructor(data: Object, persona: Persona) {
    super(data);
    this.persona = persona;
  }

  getNextEvent(): Event { return null; }

  static convertFlags(data): void { return null; }

  static convertEventFlags(event): void {
    for (let flag in event.flags) {
      let boolText = event.flags[flag].split(' ');
      let op = boolText[0], num = boolText[1];
      switch(op) {
        case '<': event.flags[flag] = x => x < num; break;
        case '<=': event.flags[flag] = x => x < num; break;
        case '>': event.flags[flag] = x => x < num; break;
        case '>=': event.flags[flag] = x => x < num; break;
      }
    }
  }

  static evaluateCounteractions(eventList: Event[], persona: Persona) {
    for (let event of eventList) {
      for (let counteraction of event.counteractions) {
        counteraction.personaInstance = persona;
        counteraction.counter = eval(counteraction.counteractionString);
      }
    }
  }

}

export class PredefinedEventLoader extends EventLoader {

  private events: PredefinedEvent[];

  constructor(persona: Persona) {
    super(predefineddata, persona);
    this.events = this.createObjectList((<any>this.data).events).reverse() as PredefinedEvent[];
    EventLoader.evaluateCounteractions(this.events, this.persona);
  }

  getNextEvent(): PredefinedEvent {
    return this.events.pop();
  }

  getEventList(): PredefinedEvent[] {
    return this.events;
  }

  protected createObject(): PredefinedEvent {
    return new PredefinedEvent(null, null, null, null);
  }

  static convertFlags(data): void {
    for (let event of (<any>data).events) {
      PredefinedEventLoader.convertEventFlags(event);
    }
  }

}

export class RandomEventLoader extends EventLoader {

  protected positiveEvents: Event[];
  protected negativeEvents: Event[];
  private eventGetFunc: (number) => Event;
  private listLen: number;

  constructor(persona: Persona) {
    super(randomdata, persona);
    this.setDataLists();
  }

  private setDataLists(): void {
    this.positiveEvents = this.createObjectList((<any>this.data).positiveEvents) as RandomEvent[];
    EventLoader.evaluateCounteractions(this.positiveEvents, this.persona)
    this.negativeEvents = this.createObjectList((<any>this.data).negativeEvents) as RandomEvent[];
    EventLoader.evaluateCounteractions(this.negativeEvents, this.persona)
  }

  getNextEvent(): RandomEvent {
    this.setEventGetFuncAndListLen(Math.floor(Math.random() * 2) === 0 ? this.positiveEvents : this.negativeEvents);
    let rand = Math.floor(Math.random() * this.listLen);
    return this.eventGetFunc(rand);
  }

  private setEventGetFuncAndListLen(eventList: RandomEvent[]): void {
    this.eventGetFunc = eventList === this.positiveEvents ? this.getPositiveEvent : this.getNegativeEvent;
    this.listLen = eventList.length;
  }

  removeEventFromPositiveList(eventList: RandomEvent[], event: RandomEvent): void {
    this.positiveEvents = this.removeEventFromList(eventList, event);
  }

  removeEventFromNegativeList(eventList: RandomEvent[], event: RandomEvent): void {
    this.negativeEvents = this.removeEventFromList(eventList, event);
  }

  private removeEventFromList(eventList: RandomEvent[], event: RandomEvent): RandomEvent[] {
    return eventList.filter(ev => ev !== event);
  }

  getPositiveEvent(index: number): RandomEvent {
    if (this.positiveEvents.length === 0) {
      return this.getNextEvent();
    }
    return this.getEvent(index, this.positiveEvents);
  }

  private getEvent(index: number, eventList: RandomEvent[]): RandomEvent {
    let event = eventList[index];
    if (eventList === this.positiveEvents) {
      this.removeEventFromPositiveList(eventList, event);
    } else {
      this.removeEventFromNegativeList(eventList, event);
    }
    return event;
  }

  getNegativeEvent(index: number): RandomEvent {
    if (this.negativeEvents.length === 0) {
      return this.getNextEvent();
    }
    return this.getEvent(index, this.negativeEvents);
  }

  getPositiveEventList(): Event[] {
    return this.positiveEvents;
  }

  getNegativeEventList(): Event[] {
    return this.negativeEvents;
  }

  protected createObject(): RandomEvent {
    return new RandomEvent(null, null, null, null);
  }

  static convertFlags(data): void {
    for (let event of (<any>data).positiveEvents) {
      RandomEventLoader.convertEventFlags(event);
    }
    for (let event of (<any>data).negativeEvents) {
      RandomEventLoader.convertEventFlags(event);
    }
  }

}

// Statically convert flags
RandomEventLoader.convertFlags(randomdata);
PredefinedEventLoader.convertFlags(predefineddata)
