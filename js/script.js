'use strict';

const arr = [];

arr.push('258', '354', '681', '445', '217', '905', '759');

console.log(arr.filter(function(num) {
    return num.includes(['2', '4'][0]);
}));

let num = 100;

for (let i = 2; i <= num; i++) {
    let point = 1;
    for (let j = 2; j <= i / 2 && point === 1; j++) {
        if (i % j === 0) {
            point = 0;
        }
    }
    if (point === 1) {
        console.log(i + ' - Делители этого числа: 1 и ' + i);
    }
}