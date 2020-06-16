export class Patient {
    fullName: string;
    email: string;
    password: string;

    constructor() {
        this.fullName = this.email = this.password = '';
    }

    public setValues(fullName: string, email: string, password: string) {
        this.fullName = fullName;
        this.email = email;
        this.password = password;
    }
}
