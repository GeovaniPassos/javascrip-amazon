export function isWeekend(date) {
    let week = date.format('dddd');
    console.log(week)
    if (week == 'Saturday' || week === 'Sunday') {
        console.log('Sabado ou domingo');
    }
}

export default isWeekend;