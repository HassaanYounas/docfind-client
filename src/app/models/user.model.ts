export class User {
    accountType: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    cellularNumber: string;
    dateOfBirth: string

    constructor() {
        this.accountType = -1;
        this.firstName = this.lastName = this.email = this.password = this.cellularNumber = this.dateOfBirth = '';
    }

    setValues(data: any, countryCode: string): void {
        this.firstName = data.firstName;
        this.lastName = data.lastName;
        this.email = data.email;
        this.password = data.password;
        this.cellularNumber = countryCode + data.cellularNumber;
        this.dateOfBirth = data.dateOfBirth;
    }

    setAccountType(accountType: number): void {
        this.accountType = accountType;
    }
}
