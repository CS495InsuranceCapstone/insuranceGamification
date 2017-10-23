export class Event {}

export class RandomEvent extends Event {
  name: string;
  text: string;
  img: HTMLImageElement;

  constructor(name, text, img) {
    super()
    this.name = name;
    this.text = text;
    this.img = img;
  }
}
