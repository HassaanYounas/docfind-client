export class Patient {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    cellularNumber: string;
    dateOfBirth: string

    constructor() {
        this.firstName = this.lastName = this.email = this.password = this.cellularNumber = this.dateOfBirth = '';
    }

    setValues(data: any, countryCode: string) {
        this.firstName = data.firstName;
        this.lastName = data.lastName;
        this.email = data.email;
        this.password = data.password;
        this.cellularNumber = countryCode + data.cellularNumber;
        this.dateOfBirth = data.dateOfBirth;
    }
}
