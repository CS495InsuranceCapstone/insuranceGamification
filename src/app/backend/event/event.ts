export class Event {
  name: string;
  text: string;
  img: HTMLImageElement;

  constructor(name, text, img) {
    this.name = name;
    this.text = text;
    this.img = img;
  }
}

export class RandomEvent extends Event {}

export class PredefinedEvent extends Event {}
