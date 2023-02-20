export class Patient {

    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    dateBirth: any;
  
    constructor(id: string, firstName: string, lastName: string, email: string, phoneNumber: string, dateBirth: any) {
      this.id = id;
      this.firstName = firstName;
      this.lastName = lastName;
      this.email = email;
      this.phoneNumber = phoneNumber;
      this.dateBirth = dateBirth;
    }
}
