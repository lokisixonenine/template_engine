// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.
const Employee = require("./Employee");

class Manager extends Employee {
    constructor(name, id, email, officePhoneNumber) {
        super(name, id, email);
        this.officePhoneNumber = officePhoneNumber;
    }

    getRole() {
        return "Manager";
    }
    getofficePhoneNumber() {
        return this.officePhoneNumber;
    }
}

module.exports = Manager
