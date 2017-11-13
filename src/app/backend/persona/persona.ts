export class Persona {

      name: string;
      sex: string;
      age: number;
      maritalStatus: string;
      dependents: number;
      profession: string;
      salary: number;

      // + operator converts string to number
      constructor(name: string,
                  sex: string,
                  age: number,
                  maritalStatus: string,
                  dependents: number,
                  profession: string,
                  salary: number) {
        this.name = name;
        this.sex = sex;
        this.age = age;
        this.maritalStatus = maritalStatus;
        this.dependents = dependents;
        this.profession = profession;
        this.salary = salary;
      }

      convertFieldsFromJSON(): void {
        this.age = +this.age;
        this.dependents = +this.dependents;
        this.salary = +this.salary;
      }

    }
