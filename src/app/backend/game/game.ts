import { Persona } from '../persona/persona';
import { PersonaLoader } from '../persona/personaloader';
import { EventQueue } from '../event/eventqueue';
import { Event } from '../event/event';

export class Game{

    private queue: EventQueue;
    persona: Persona;
    event:Event;
    counteract: Game;
    myPersona: PersonaLoader;
    
    constructor(event:Event,persona: Persona){
        this.persona = persona;
        this.event = event;
        this.queue = new EventQueue(event);
        this.start(persona); 
    }

    start(persona:Persona){
        
        return this.myPersona.getPersonas();
    }

    
    isEmpty(nextQueue:Event){
        
        for(var x in nextQueue){
            if(nextQueue == null){
                return true;
            }else{
                return false;
            }
        }
    }

    
    private presentEvent(event: Event): void{
        if(this.queue == null){
            this.end();            
        }else{
            this.queue.getNextEvent(event);
        }
    }
  

    private end(): void{
        if(this.isEmpty(this.queue.getNextEvent(this.persona))){
            console.log("There are no more events to encounter. You have won the game!");
        }else if(this.counteract.counteractEvent == null){
            console.log("You were unabale to counteract the event. Game is over!");
        }  
    }

    private counteractEvent(option:() => void): void{

    }

}