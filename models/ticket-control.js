const path = require('path')
const fs = require('fs')

class Ticket{

    constructor(number, desk) {
        this.number = number
        this.desk = desk
    }
}

class TicketControl {

    constructor() {

        this.today = new Date().getDate()
        this.tickets = []
        this.last = 0
        this.last4 = []

        this.init()
    }

    init() {
        const {today, tickets, last, last4} = require('../database/data.json')

        if (today == this.today) {
            this.tickets = tickets
            this.last    = last
            this.last4   = last4
        } else {

            this.saveDB();
        }
    }

    get toJson() {
        return {
            today: this.today,
            tickets: this.tickets,
            last: this.last,
            last4: this.last4
        }
    }

    saveDB() {

        const pathDB = path.join(__dirname, '../database/data.json');

        fs.writeFileSync(pathDB, JSON.stringify(this.toJson));
    }

    next() {
        this.last += 1;

        const ticket = new Ticket(this.last, null)

        this.tickets.push(ticket)

        this.saveDB();

        return `Ticket ${ticket.number}`
    }

    attendTicket(desk) {

        if (this.tickets.length === 0) {
            return null
        }

        const ticket = this.tickets.shift();
        ticket.desk = desk

        this.last4.unshift(ticket);

        if (this.last4.length > 4) {
            this.last4.splice(-1, 1)
        }

        this.saveDB();

        return ticket;
    }
}

module.exports = TicketControl