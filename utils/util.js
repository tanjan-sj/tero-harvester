const moment = require('moment');

const validateDateFormat = (date) => {
    return moment(date, 'YYYY-MM-DD', true).isValid();
}

module.exports = {
    validateDateFormat
}
