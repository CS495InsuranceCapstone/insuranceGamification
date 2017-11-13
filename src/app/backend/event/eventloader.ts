import * as randomdata from './randomevents.json';
import * as predefineddata from './predefinedevents.json';
import { Event, RandomEvent, PredefinedEvent } from './event';
import { Loader } from '../util/loader'

class EventLoader extends Loader {

  getNextEvent(): Event { return null; }

}

export class PredefinedEventLoader extends EventLoader {

  private events: PredefinedEvent[];

  constructor() {
    super(predefineddata);
    this.events = this.createObjectList((<any>this.data).events).reverse() as
      PredefinedEvent[];
  }

  getNextEvent(): PredefinedEvent {
    return this.events.pop();
  }

  getEventList(): PredefinedEvent[] {
    return this.events;
  }

  protected createObject(): PredefinedEvent {
    return new PredefinedEvent(null, null, null);
  }

}

export class RandomEventLoader extends EventLoader {

  protected positiveEvents: Event[];
  protected negativeEvents: Event[];
  private eventGetFunc: (number) => Event;
  private listLen: number;

  constructor() {
    super(randomdata);
    this.setDataLists();
  }

  private setDataLists(): void {
    this.positiveEvents = this.createObjectList((<any>this.data).positiveEvents) as RandomEvent[];
    this.negativeEvents = this.createObjectList((<any>this.data).negativeEvents) as RandomEvent[];
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
    return new RandomEvent(null, null, null);
  }

}
