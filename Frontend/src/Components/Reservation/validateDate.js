const validateDate = () => {
    const dateElement = document.querySelector('input[type="date"]');
    let currentDate = new Date();
    if (dateElement.value.split('-')[0] < currentDate.getFullYear())
        return false;
    // eslint-disable-next-line
    else if (dateElement.value.split('-')[0] == currentDate.getFullYear()) {
        if (dateElement.value.split('-')[1] < currentDate.getMonth()+1)
            return false;
        // eslint-disable-next-line
        else if (dateElement.value.split('-')[1] == currentDate.getMonth()+1) {
            if (dateElement.value.split('-')[2] < currentDate.getDate())
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

export default validateDate;