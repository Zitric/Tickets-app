
const fs = require( 'fs' );

class TicketControl {

    constructor() {

        this.last = 0;

        this.today = new Date().getDate();
        const data = require( '../data/data.json');

        const compareDays = data.today === this.today
            ? () => {
                this.last = data.last;
            }
            : () => {
                this.rebootCount();
            };

        compareDays();


    }

    next() {
        this.last += 1;
        this.saveFile();

        return `Ticket ${ this.last }`;
    }

    rebootCount() {
        this.last = 0;
        this.saveFile();
    }

    saveFile() {
        const jsonData = {
            last: this.last,
            today: this.today
        };

        const jsonDataString = JSON.stringify( jsonData );

        fs.writeFileSync( './server/data/data.json', jsonDataString );
    }

}

module.exports = {
    TicketControl
};
