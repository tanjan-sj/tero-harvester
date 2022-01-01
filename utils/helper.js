//const crypto = require("crypto");
const { uniqueKeySeparator } = require("./constant");
const { validateDateFormat } = require("./util");

const getUniqueDatesAndUniqueKeys = async (req) => {
    let uniqueDates = [];
    let uniqueKeys = [];

    for(const key in req){
        for(const val of req[key]) {
            if(validateDateFormat(val)){
                if(!uniqueDates.includes(val)){
                    uniqueDates.push(val);
                }
                uniqueKeys.push(key + uniqueKeySeparator + val);
            }
        }
    }

    return {uniqueDates, uniqueKeys};
}

module.exports = {
    getUniqueDatesAndUniqueKeys
}
