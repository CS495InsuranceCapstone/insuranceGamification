import { Component, PipeTransform, Pipe } from '@angular/core';

import { Persona } from './backend/persona/persona'
import { PersonaLoader } from './backend/persona/personaloader'
import { EventQueue, EventQueueBuilder } from './backend/event/eventqueue'
import { Event } from './backend/event/event'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  readonly title = 'Insurance Game';
  readonly personas = new PersonaLoader().getPersonas();

  persona = this.personas[0];
  eventQueue = new EventQueueBuilder().build();
  event = this.popEvent();

  game = null; //new Game();

  private popEvent(): Event {
    return this.eventQueue.getNextEvent(this.persona);
  }

}

@Pipe({name: 'capitalize'})
export class CapitalizePipe implements PipeTransform {
  transform(value: string): string {
    return value[0].toUpperCase() + value.substr(1)
  }
}

@Pipe({name: 'commafy'})
export class CommafyPipe implements PipeTransform {
  transform(value: number): string {
      let valueString = value.toString().split('').reverse();
      let returnString = ''
      let currLen = 0;
      for(let char of valueString) {
        if (currLen == 3) {
          returnString = ',' + returnString;
          currLen = 0;
        }

        returnString = char + returnString;
        currLen++;
      }
      return returnString;
  }
}
