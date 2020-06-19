export class Doctor {
    id: string;
    fullName: string;
    email: string;
    password: string;
    cellularNumber: string;
    qualification: string;
    workingDays: string;
    workingHours: string;
    address: string;
    fee: number;
    description: string;
    ratings: string[];
    avgRating: number;

    constructor() {
        this.id = this.fullName = this.email = this.password = '';
        this.cellularNumber = this.qualification = this.workingDays = '';
        this.workingHours = this.address = this.description = '';
        this.fee = this.avgRating = 0;
        this.ratings = new Array<string>();
    }

    public setValues(
        id: string,
        fullName: string,
        email: string,
        password: string,
        cellularNumber: string,
        qualification: string,
        workingDays: string,
        workingHours: string,
        address: string,
        fee: number,
        description: string,
        ratings: string[]
    ) {
        this.id = id;
        this.fullName = fullName;
        this.email = email;
        this.password = password;
        this.cellularNumber = cellularNumber;
        this.qualification = qualification;
        this.workingDays = workingDays;
        this.workingHours = workingHours;
        this.address = address;
        this.description = description;
        this.fee = fee;
        this.ratings = ratings;
    }
}
