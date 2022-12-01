const getDate = (date) => {
    const year = date.split('-')[0];
    const month = date.split('-')[1];
    const day = date.split('-')[2];

    let newDate = ( year + '-' + month + '-' + day);

    return newDate;
}

export default getDate;
