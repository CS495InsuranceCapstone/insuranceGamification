import { Component, PipeTransform, Pipe } from '@angular/core';

import { Persona } from './backend/persona/persona'
import { PersonaLoader } from './backend/persona/personaloader'
import { EventQueue, EventQueueBuilder } from './backend/event/eventqueue'
import { Event } from './backend/event/event'
import { WholeLifeInsurancePolicy } from './backend/insurance/wholelifeinsurance'
import { TermLifeInsurancePolicy } from './backend/insurance/termlife'
import { CheckingAccount } from './backend/bank/bank_accounts'
import { SavingsAccount } from './backend/bank/bank_accounts'
import { UnusableError } from './backend/util/loss_exception'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  readonly title = 'Insurance Game';
  readonly personas = new PersonaLoader().getPersonas();

  persona = this.personas[0];
  eventQueue = new EventQueueBuilder(this.persona).build();
  event: Event;

  constructor() {
    this.persona.insurancePolicy = new WholeLifeInsurancePolicy(this.persona, 1000000, 100);
    this.presentEvent();
  }

  private popEvent(): Event {
    return this.eventQueue.getNextEvent(this.persona);
  }

  counteract(buttonIndex) {
    try {
      this.event.counteractions[buttonIndex].counteraction();
      this.persona.passYear();
      document.getElementById('settings').style.display = "none";
      this.presentEvent();
    } catch (e) {
      console.log(e);
      alert('You can\'t do that. You do not have the necessary assets.');
    }
  }

  presentEvent() {
    if (this.eventQueue.isEmpty(this.persona)) {
      this.win();
    } else {
      this.event = this.popEvent();
    }
  }
  reloadFunction() {
    location.reload();
  }

  win() {
    document.getElementById('winModal').style.display = 'block'
  }

  lose() {
    document.getElementById('loseModal').style.display = 'block'
  }

}

@Pipe({ name: 'capitalize' })
export class CapitalizePipe implements PipeTransform {
  transform(value: string): string {
    return value[0].toUpperCase() + value.substr(1)
  }
}

@Pipe({ name: 'commafy' })
export class CommafyPipe implements PipeTransform {
  transform(value: number): string {
    let valueString: string[];
    let centString = '';
    if (value.toString().includes('.')) {
      valueString = value.toString().split('.')[0].split('').reverse()
      centString = '.' + value.toString().split('.')[1];
    } else valueString = value.toString().split('').reverse();
    let returnString = ''
    let currLen = 0;
    for (let char of valueString) {
      if (currLen == 3) {
        returnString = ',' + returnString;
        currLen = 0;
      }

      returnString = char + returnString;
      currLen++;
    }
    return returnString + centString;
  }
}

@Pipe({ name: 'round' })
export class RoundPipe implements PipeTransform {
  transform(value: number): number {
    return +value.toFixed(2);
  }
}
