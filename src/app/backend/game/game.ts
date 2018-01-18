import { Persona } from '../persona/persona';
import { EventQueue } from '../event/eventqueue';
import { Event } from '../event/event';

export class Game{

    private queue: EventQueue;
    persona: Persona;
    event:Event;
    

    constructor(event:Event,persona: Persona){
        this.persona = persona;
        this.event = event;
        this.queue = new EventQueue(event);

    }

    private presentEvent(event: Event): void{
        if(this.queue == null){
            this.queue = new EventQueue(event);
        }else{
            this.queue.getNextEvent(event);
        }
    }

    private counteractEvent(option:() => void): void{

    }
    


    

}