import moment from 'moment';

var date = moment().hour(0).minute(0).second(0);
var timeSlots = [];

while (date.hour() !== 23 || date.minute() !== 45) {
    timeSlots.push(date.format('HH:mm'));
    date.add(15, 'minutes');
}


export default timeSlots;
