import * as randomdata from './randomevents.json';
import { Event, RandomEvent } from './event'

export class EventLoader {
  data

  positiveEvents: Event[]
  negativeEvents: Event[]

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
}

export class RandomEventLoader extends EventLoader {

  constructor() {
    super();
    this.data = randomdata;
    this.positiveEvents = this.createEventList((<any>this.data).positiveRandomEvents);
    this.negativeEvents = this.createEventList((<any>this.data).negativeRandomEvents);
  }

  private eventGetFunc: (number) => Event;
  private listLen: number;

  private createEventList(jsonList) {
    return jsonList.map(json =>
      Object.assign(new RandomEvent(null, null, null), json)
    )
  }

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
