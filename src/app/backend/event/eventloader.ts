import * as randomdata from './randomevents.json';
import * as predefineddata from './predefinedevents.json';
import { Event, RandomEvent } from './event';

class EventLoader {
  protected data;

  protected positiveEvents: Event[];
  protected negativeEvents: Event[];

  getNextEvent(isPos) {}

  getPositiveEventList() {
    return this.positiveEvents;
  }

  getNegativeEventList() {
    return this.negativeEvents;
  }

  protected createEventList(jsonList) {
    return jsonList.map(json =>
      Object.assign(new RandomEvent(null, null, null), json)
    );
  }

  protected setDataLists() {
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

  getNextEvent(isPos=Math.floor(Math.random() * 2) === 0) {
    this.setEventGetFuncAndListLen(isPos ? this.positiveEvents : this.negativeEvents);
    let rand = Math.floor(Math.random() * this.listLen);
    return this.eventGetFunc(rand);
  }

  private setEventGetFuncAndListLen(eventList) {
    this.eventGetFunc = eventList === this.positiveEvents ? this.getPositiveEvent : this.getNegativeEvent;
    this.listLen = eventList.length;
  }

  private removeEventFromList(eventList, event) {
    return eventList.filter(ev => ev !== event);
  }

  removeEventFromPositiveList(eventList, event) {
    this.positiveEvents = this.removeEventFromList(eventList, event);
  }

  removeEventFromNegativeList(eventList, event) {
    this.negativeEvents = this.removeEventFromList(eventList, event);
  }

  private getEvent(index, eventList) {
    var event = eventList[index];
    if (eventList === this.positiveEvents) {
      this.removeEventFromPositiveList(eventList, event);
    } else {
      this.removeEventFromNegativeList(eventList, event);
    }
    return event;
  }

  getPositiveEvent(index) {
    return this.getEvent(index, this.positiveEvents);
  }

  getNegativeEvent(index) {
    return this.getEvent(index, this.negativeEvents);
  }

}

export class PredefinedEventLoader extends EventLoader {

  constructor() {
    super();
    this.data = predefineddata;
    this.setDataLists();
  }

  getNextEvent(isPos) {
    return isPos? this.positiveEvents.pop() : this.negativeEvents.pop()
  }

}
