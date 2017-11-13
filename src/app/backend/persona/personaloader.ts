import { Loader } from '../util/loader';
import { Persona } from './persona'
import * as personadata from './personas.json';

export class PersonaLoader extends Loader {

  private personas: Persona[];

  constructor() {
    super(personadata);
    this.personas = this.createObjectList((<any>this.data).personas) as Persona[];
    this.personas.forEach(persona => persona.convertFieldsFromJSON())
  }

  protected createObject(): Persona {
    return new Persona(null,
                       null,
                       null,
                       null,
                       null,
                       null,
                       null);
  }

  getPersonas(): Persona[] {
    return this.personas;
  }

}
