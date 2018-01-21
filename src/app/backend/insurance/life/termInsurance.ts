import { Persona } from '../../persona/persona'


export class Term_Insurance{
    
    persona: Persona;
    term: number;
    annualValue: number;
    coverage: number;
    //date = new Date();
    

    constructor(persona:Persona, term:number,annualValue: number,coverage: number){
        this.persona = persona;
        this.term = term;
        this.annualValue = annualValue;
        this.coverage = coverage;

    }

    private tenYearsTerm(): void{
        if(this.term == 10){
            this.coverage = 250000;
            this.annualValue = 172.50;

        }
        if(){

        }

    }

    private twentyYearsTerm(): void{
        if(this.term == 20){
            this.coverage = 250000;
            this.annualValue = 177.50;
            
        }
        
    }

    private thirtyYearsTerm(): void{
        if(this.term == 30){
            this.coverage = 250000;
            this.annualValue = 232.50;
            
        }
    }

    private endTerm(): void{

    }

    definePolicy(){

    }
}