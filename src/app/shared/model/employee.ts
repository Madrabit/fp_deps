export class Employee {
  objectId: number;
  name: string;
  lastname: string;
  email: string;
  depName: string;
  departmentNumber: number;

  constructor(objectId: number, name: string, lastname: string,  email: string, depName: string, departmentNumber: number) {
    this.objectId = objectId;
    this.name = name;
    this.lastname = lastname;
    this.email = email;
    this.depName = depName;
    this.departmentNumber = departmentNumber;
  }
}
