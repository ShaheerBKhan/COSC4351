const isHighTrafficDay = () => {
    const dateElement = document.querySelector('input[type="date"]');
    var date = new Date();
    date.setFullYear(`${dateElement.value.split('-')[0]}`);
    date.setMonth(`${dateElement.value.split('-')[1]}`-1);
    date.setDate(`${dateElement.value.split('-')[2]}`);
    const month = dateElement.value.split('-')[1];
    const day = dateElement.value.split('-')[2];

    // static holidays
    const isDate = (m, d) => {
        // eslint-disable-next-line
        return (month == m && day == d);
    };
    if (isDate(1, 1)) { return "New Year"; }
    else if (isDate(7, 4)) { return "Independence Day"; }
    else if (isDate(11, 11)) { return "Veterans Day"; }
    else if (isDate(12, 25)) { return "Christmas Day"; }

    // dynamic holidays
    const isDay = (m, d, occurance) => {
        // eslint-disable-next-line
        if (month == m && date.getDay() == d) {
            if (occurance > 0) {
                // eslint-disable-next-line
                return occurance == Math.ceil(day / 7);
            } else {
                // check last occurance
                let _d = new Date(date);
                _d.setDate(date.getDate() + 7);
                return _d.getMonth() > date.getMonth();
            }
        }
        return false;
    };
    if (isDay(1, 1, 3)) { return "MLK Day"; }
    else if (isDay(2, 1, 3)) { return "Presidents Day"; }
    else if (isDay(5, 1, -1)) { return "Memorial Day"; }
    else if (isDay(9, 1, 1)) { return "Labor Day"; }
    else if (isDay(10, 1, 2)) { return "Columbus Day"; }
    else if (isDay(11, 4, 4)) { return "Thanksgiving Day"; }

    // weekends
    if(date.getDay() === 6) { return "Saturday"; }  // eslint-disable-next-line
    if (date.getDay() === 0) { return "Sunday"; }   // eslint-disable-next-line

    // not a holiday
    return false;
}

export default isHighTrafficDay;
