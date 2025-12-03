import { formatCurrency } from '../scripts/utils/money.js'

if (formatCurrency(2095) === '20.95') {
    console.log('passed');
} else {
    console.log('failed');
}
console.log(formatCurrency(Math.round(295)));

if (formatCurrency(0) === '0.00') {
    
}
