'use strict';

const num = 266219;

const arrNum = Array.from(String(num), Number);
//const arrNum = Array.from(num.toString());

let multiplyNum = 1;

for (let i = 0; i < arrNum.length; i++) {
    multiplyNum *= arrNum[i];
}

multiplyNum += multiplyNum ** 3;

console.log(multiplyNum.toString().slice(0, 2));