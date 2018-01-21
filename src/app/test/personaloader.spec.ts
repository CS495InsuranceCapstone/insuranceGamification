import { Persona } from '../backend/persona/persona'
import { PersonaLoader } from '../backend/persona/personaloader'

describe('Persona Loader', () => {

  let personaLoader: PersonaLoader;
  let personas: Persona[];


  beforeEach(() => {
    personaLoader = new PersonaLoader();
    personas = personaLoader.getPersonas();
  });

  it('should produce Eli Paul\'s persona first', () => {
    expect(JSON.stringify(personas.pop())).toBe(
      JSON.stringify(new Persona('Eli Paul',
                                 'M',
                                 39,
                                 'married',
                                 0,
                                 'teacher',
                                 55000,
                                 .75))
      );
  });

  it('should produce Nathan Holland\'s persona second', () => {
    personas.pop();
    expect(JSON.stringify(personas.pop())).toBe(
      JSON.stringify(new Persona('Nathan Holland',
                                 'M',
                                 35,
                                 'married',
                                 1,
                                 'nurse',
                                 87500,
                                 .75))
      );
  });

  it('should produce a persona list when getPersonas is called', () => {
    let nonPersonas = personaLoader.getPersonas().filter(persona => !(persona instanceof Persona))
    expect(nonPersonas.length === 0).toBeTruthy;
  });

});
