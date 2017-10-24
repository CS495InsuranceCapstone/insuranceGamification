import * as randomdata from './randomevents.json';
import { Event, RandomEvent } from './event'

export class EventLoader {
  private data
}

export class RandomEventLoader {
  data = randomdata;

  private positiveEvents = this.createEventList((<any>this.data).positiveRandomEvents);
  private negativeEvents = this.createEventList((<any>this.data).negativeRandomEvents);

  private eventGetFunc;
  private listLen;

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
    this.eventGetFunc = eventList;
    this.listLen = eventList.length;
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

  private removeEventFromList(eventList, event, classList) {
    classList = eventList.filter(ev => ev !== event);
  }

  removeEventFromPositiveList(eventList, event) {
    this.removeEventFromList(eventList, event, this.positiveEvents);
  }

  removeEventFromNegativeList(eventList, event) {
    this.removeEventFromList(eventList, event, this.negativeEvents);
  }

}
