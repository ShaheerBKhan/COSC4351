const minDateAttribute = () => {
    const dateElement = document.querySelector('input[type="date"]');
    let currentDate = new Date();
    dateElement.setAttribute('min', currentDate.toISOString().split('T')[0]);
}

export default minDateAttribute;
