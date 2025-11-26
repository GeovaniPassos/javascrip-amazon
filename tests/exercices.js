import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import isSatSum from './date.js';
/*
const today = dayjs();
let todaynew = today.add(10, 'days');

console.log(todaynew.format('MMMM, D'));

let today2 = today.add(1, 'month');
console.log(today2.format('MMMM, D'));

let today3 = today.subtract(1, 'month');

console.log(today3.format('MMMM, D'));

console.log(today.format('dddd'));
*/

let today = dayjs();
today.add(1, 'days');

//isSatSum(today.add(5, 'days'));

//console.log(today.add(1, 'days'), today.format('dddd'));

let newday = isWeeked(today.add(3, 'days'));
//console.log(newday.format('dddd'));
//console.log(newday.format('dddd'));

function isWeeked(day) {
    const todayWeek = day.format('dddd');

    if (todayWeek === 'Saturday') {
        day = day.add(2, 'days');
    } else if (todayWeek === 'Sunday') {
        day = day.add(1, 'days');
    }
    
    return day;
}

