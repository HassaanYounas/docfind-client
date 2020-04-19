export class User {
    accountType: number;
    fullName: string;
    email: string;
    password: string;
    cellularNumber: string;
    dateOfBirth: string

    constructor() {
        this.accountType = -1;
        this.fullName = this.email = this.password = this.cellularNumber = this.dateOfBirth = '';
    }

    setValues(data: any, countryCode: string, accountType: number): void {
        this.accountType = accountType;
        this.fullName = data.fullName;
        this.email = data.email;
        this.password = data.password;
        this.cellularNumber = countryCode + data.cellularNumber;
        this.dateOfBirth = data.dateOfBirth;
    }

    setAccountType(accountType: number): void {
        this.accountType = accountType;
    }
}
