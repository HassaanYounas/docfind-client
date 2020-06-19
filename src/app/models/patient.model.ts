export class Patient {
    id: string;
    fullName: string;
    email: string;
    password: string;

    constructor() {
        this.id = this.fullName = this.email = this.password = '';
    }

    public setValues(id: string, fullName: string, email: string, password: string) {
        this.id = id;
        this.fullName = fullName;
        this.email = email;
        this.password = password;
    }
}
