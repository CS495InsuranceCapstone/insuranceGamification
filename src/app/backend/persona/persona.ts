export class Persona {

      name: string;
      sex: string;
      age: string;
      maritalStatus: string;
      dependents: string;
      profession: string;
      salary: string;


      constructor(name: string,
                  sex: string,
                  age: string,
                  maritalStatus: string,
                  dependents: string,
                  profession: string,
                  salary: string) {
        this.name = name;
        this.sex = sex;
        this.age = age;
        this.maritalStatus = maritalStatus;
        this.dependents = dependents;
        this.profession = profession;
        this.salary = salary;
      }

    }
