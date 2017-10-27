import * as randomdata from './randomevents.json';
import * as predefineddata from './predefinedevents.json';
import { Event, RandomEvent } from './event';

export class EventLoader {
  protected data;

  protected positiveEvents: Event[];
  protected negativeEvents: Event[];

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

  private removeEventFromList(eventList, event) {
    return eventList.filter(ev => ev !== event);
  }

  removeEventFromPositiveList(eventList, event) {
    this.positiveEvents = this.removeEventFromList(eventList, event);
  }

  removeEventFromNegativeList(eventList, event) {
    this.negativeEvents = this.removeEventFromList(eventList, event);
  }

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

  getRandomEvent() {
    var rand = Math.floor(Math.random() * 2);
    this.seteventGetFuncAndListLen(rand === 0 ? this.positiveEvents : this.negativeEvents);
    rand = Math.floor(Math.random() * this.listLen);
    return this.eventGetFunc(rand);
  }

  private seteventGetFuncAndListLen(eventList) {
    this.eventGetFunc = eventList === this.positiveEvents ? this.getPositiveEvent : this.getNegativeEvent;
    this.listLen = eventList.length;
  }

}

export class PredefinedEventLoader extends EventLoader {

  constructor() {
    super();
    this.data = predefineddata;
    this.setDataLists();
  }

}
