import { Counteraction } from './counteraction'

export class Event {

  name: string;
  text: string;
  img: string;
  flags: Object;
  counteractions: Counteraction[];
  //TODO: Change img type to HTMLImageElement when ready for use

  constructor(name: string, text: string, img: string) {
    this.name = name;
    this.text = text;
    this.img = img;
  }

}

export class RandomEvent extends Event {}

export class PredefinedEvent extends Event {}
