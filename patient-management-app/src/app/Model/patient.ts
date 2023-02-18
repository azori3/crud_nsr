export class Patient {

    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    dateOfBirth: Date;
  
    constructor(id: number, firstName: string, lastName: string, email: string, phoneNumber: string, dateOfBirth: Date) {
      this.id = id;
      this.firstName = firstName;
      this.lastName = lastName;
      this.email = email;
      this.phoneNumber = phoneNumber;
      this.dateOfBirth = dateOfBirth;
    }
}
