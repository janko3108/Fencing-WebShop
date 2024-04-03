export class FormModel {
    constructor() {
        this.FirstName = "";
        this.LastName = "";
        this.CardNumber = "";
        this.Email = "";
        this.defaultValues = {
            FirstName: "Jane",
            LastName: "Doe",
            CardNumber: "XXXX XXXX XXXX XXXX",
            Email: "janedoe@gmail.com"
        };
        let weapon = JSON.parse(localStorage.getItem("weapon"));

        for (let property in weapon) {
            this[property] = weapon[property];
        }
    }

    persist() {
        localStorage.setItem("weapon", JSON.stringify(this));
    }

    getInputData() {
        return JSON.parse(JSON.stringify(this));
    }
}
