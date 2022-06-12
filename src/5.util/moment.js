const moment = require("moment")
 require("moment/locale/id")

exports.formatLocalDate = (date) => moment(date).format("LLL")