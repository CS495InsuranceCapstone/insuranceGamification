import * as randomdata from './randomevents.json';
import * as predefineddata from './predefinedevents.json';
import { Event, RandomEvent, PredefinedEvent } from './event';

class EventLoader {
  protected data: Object;

  getNextEvent(): Event { return null; }

  protected createEventList(jsonList: Object[]): Event[] {
    return jsonList.map(json =>
      Object.assign(new RandomEvent(null, null, null), json)
    );
  }
}

export class RandomEventLoader extends EventLoader {

  protected positiveEvents: Event[];
  protected negativeEvents: Event[];
  private eventGetFunc: (number) => Event;
  private listLen: number;

  constructor() {
    super();
    this.data = randomdata;
    this.setDataLists();
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

  private removeEventFromList(eventList: RandomEvent[], event: RandomEvent): RandomEvent[] {
    return eventList.filter(ev => ev !== event);
  }

  removeEventFromPositiveList(eventList: RandomEvent[], event: RandomEvent): void {
    this.positiveEvents = this.removeEventFromList(eventList, event);
  }

  removeEventFromNegativeList(eventList: RandomEvent[], event: RandomEvent): void {
    this.negativeEvents = this.removeEventFromList(eventList, event);
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

  getPositiveEvent(index: number): RandomEvent {
    if (this.positiveEvents.length === 0) {
      return this.getNextEvent();
    }
    return this.getEvent(index, this.positiveEvents);
  }

  getNegativeEvent(index: number): RandomEvent {
    if (this.negativeEvents.length === 0) {
      return this.getNextEvent();
    }
    return this.getEvent(index, this.negativeEvents);
  }

  protected createEventList(jsonList: Object[]): RandomEvent[] {
    return jsonList.map(json =>
      Object.assign(new RandomEvent(null, null, null), json)
    );
  }

  private setDataLists(): void {
    this.positiveEvents = this.createEventList((<any>this.data).positiveEvents);
    this.negativeEvents = this.createEventList((<any>this.data).negativeEvents);
  }

  getPositiveEventList(): Event[] {
    return this.positiveEvents;
  }

  getNegativeEventList(): Event[] {
    return this.negativeEvents;
  }

}

export class PredefinedEventLoader extends EventLoader {

  private events: PredefinedEvent[];

  constructor() {
    super();
    this.data = predefineddata;
    this.events = this.createEventList((<any>this.data).events);
  }

  getNextEvent(): PredefinedEvent {
    return this.events.pop();
  }

  protected createEventList(jsonList: Object[]): PredefinedEvent[] {
    return jsonList.map(json =>
      Object.assign(new PredefinedEvent(null, null, null), json)
    );
  }

  getEventList(): PredefinedEvent[] {
    return this.events;
  }

}
