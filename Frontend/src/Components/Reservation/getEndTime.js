const getEndTime = (startTime, hoursIncrement) => {
    const hours = startTime.split(':')[0];
    const minutes = startTime.split(':')[1];

    let time = ( ( parseInt(hours) + hoursIncrement) + ':' + minutes);

    return time;
}

export default getEndTime;
