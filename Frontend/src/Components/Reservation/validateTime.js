const validateTime = () => {
    const dateElement = document.querySelector('input[type="date"]');
    const timeElement = document.querySelector('input[type="time"]');
    let currentDate = new Date('November 29, 2022 10:00:00');
    let date = currentDate.getFullYear()+'-'+(currentDate.getMonth()+1)+'-'+currentDate.getDate();
    let timeElementHours = timeElement.value.split(':')[0];
    let timeElementMinutes = timeElement.value.split(':')[1];

    if (timeElementHours < 8 || timeElementHours > 20)
        return false;

    // eslint-disable-next-line
    if (timeElementHours == 20 && timeElementMinutes > 0)
        return false;

    // eslint-disable-next-line
    if (dateElement.value == date) {
        if (timeElementHours < currentDate.getHours())
            return false;
        // eslint-disable-next-line
        else if (timeElementHours == currentDate.getHours()) {
            if (timeElementMinutes <= currentDate.getMinutes())
                return false;
            else
                return true;
        }
        else
            return true;
    }
    else
        return true;
}

export default validateTime;