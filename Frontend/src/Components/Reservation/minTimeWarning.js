const minTimeWarning = (setWarningMessage, setShowWarning) => {
    let currentDate = new Date();

    if (currentDate.getHours() < 8)
        setWarningMessage(`Timings for Today: 08:00AM - 08:00PM`);
    
    else if (currentDate.getHours() > 19)
            setWarningMessage(`No more reservations for today`);

    else {
        currentDate.setMinutes(currentDate.getMinutes() + 1);
        let time = (
            ( (currentDate.toTimeString().split(':')[0] > 12) ?
                (currentDate.toTimeString().split(':')[0] - 12) :
                // eslint-disable-next-line
                ( (currentDate.toTimeString().split(':')[0] == 0) ? (12) : (currentDate.toTimeString().split(':')[0]) ) )
            + ':' + currentDate.toTimeString().split(':')[1]
            + (currentDate.toTimeString().split(':')[0] > 11? "PM" : "AM")
        );
        setWarningMessage(`Timings for Today: ${time} - 08:00PM`);
    }

    setShowWarning(true);
}

export default minTimeWarning;