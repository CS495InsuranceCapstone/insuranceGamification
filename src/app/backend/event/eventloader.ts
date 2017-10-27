import * as randomdata from './randomevents.json';
import * as predefineddata from './predefinedevents.json';
import { Event, RandomEvent, PredefinedEvent } from './event';

class EventLoader {
  protected data: Object;

  protected positiveEvents: Event[];
  protected negativeEvents: Event[];

  getNextEvent(isPos): Event { return null; }

  getPositiveEventList(): Event[] {
    return this.positiveEvents;
  }

  getNegativeEventList(): Event[] {
    return this.negativeEvents;
  }

  protected createEventList(jsonList): Event[] {
    return jsonList.map(json =>
      Object.assign(new RandomEvent(null, null, null), json)
    );
  }

  protected setDataLists(): void {
    this.positiveEvents = this.createEventList((<any>this.data).positiveEvents);
    this.negativeEvents = this.createEventList((<any>this.data).negativeEvents);
  }
}

export class RandomEventLoader extends EventLoader {

  constructor() {
    super();
    this.data = randomdata;
    this.setDataLists();
  }

  private eventGetFunc: (number) => Event;
  private listLen: number;

  getNextEvent(isPos=Math.floor(Math.random() * 2) === 0): RandomEvent {
    this.setEventGetFuncAndListLen(isPos ? this.positiveEvents : this.negativeEvents);
    let rand = Math.floor(Math.random() * this.listLen);
    return this.eventGetFunc(rand);
  }

  private setEventGetFuncAndListLen(eventList): void {
    this.eventGetFunc = eventList === this.positiveEvents ? this.getPositiveEvent : this.getNegativeEvent;
    this.listLen = eventList.length;
  }

  private removeEventFromList(eventList, event): Event[] {
    return eventList.filter(ev => ev !== event);
  }

  removeEventFromPositiveList(eventList, event): void {
    this.positiveEvents = this.removeEventFromList(eventList, event);
  }

  removeEventFromNegativeList(eventList, event): void {
    this.negativeEvents = this.removeEventFromList(eventList, event);
  }

  private getEvent(index, eventList): RandomEvent {
    let event = eventList[index];
    if (eventList === this.positiveEvents) {
      this.removeEventFromPositiveList(eventList, event);
    } else {
      this.removeEventFromNegativeList(eventList, event);
    }
    return event;
  }

  getPositiveEvent(index): RandomEvent {
    return this.getEvent(index, this.positiveEvents);
  }

  getNegativeEvent(index): RandomEvent {
    return this.getEvent(index, this.negativeEvents);
  }

  protected createEventList(jsonList): RandomEvent[] {
    return jsonList.map(json =>
      Object.assign(new RandomEvent(null, null, null), json)
    );
  }

}

export class PredefinedEventLoader extends EventLoader {

  constructor() {
    super();
    this.data = predefineddata;
    this.setDataLists();
  }

  getNextEvent(isPos): PredefinedEvent {
    return isPos? this.positiveEvents.pop() : this.negativeEvents.pop()
  }

  protected createEventList(jsonList): PredefinedEvent[] {
    return jsonList.map(json =>
      Object.assign(new PredefinedEvent(null, null, null), json)
    );
  }

}
