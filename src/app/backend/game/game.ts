import { Persona } from '../persona/persona';
import { EventQueue } from '../event/eventqueue';
import { Event } from '../event/event';

export class Game{

    private queue: EventQueue;
    persona: Persona;
    event:Event;
    counteract: Game;
    

    
    constructor(event:Event,persona: Persona){
        this.persona = persona;
        this.event = event;
        this.queue = new EventQueue(event);
        this.start();

    }

    start(){
        
    }

    private presentEvent(event: Event): void{
        if(this.queue == null){
            this.end();            
        }else{
            this.queue.getNextEvent(event);
        }
    }

    private end(): void{
        if(this.queue.next.getNextEvent(event) == null){
            alert("There are no more events to encounter. You have won the game!");
        }else if(this.counteract.counteractEvent == null){
            alert("You were unabale to counteract the event. Game is over!");
        }  
    }

    private counteractEvent(option:() => void): void{

    }

    


    

}