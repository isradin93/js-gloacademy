'use strict';

const books = document.querySelectorAll('.book'),
    chapterOfBook = document.querySelectorAll('h2 > a'),
    orederOfChapter2 = books[0].querySelectorAll('ul > li'),
    orederOfChapter5 = books[5].querySelectorAll('ul > li'),
    addChapter6 = books[2].querySelectorAll('ul > li'),
    adv = document.querySelector('.adv');

books[1].after(books[0]);
books[2].before(books[4]);
books[5].insertAdjacentElement('afterend', books[2]);

document.body.style.backgroundImage = 'url("image/you-dont-know-js.jpg")';

chapterOfBook[4].textContent = `"Книга 3. this и Прототипы Объектов"`;

adv.remove();

orederOfChapter2[9].after(orederOfChapter2[2]);
orederOfChapter2[3].after(orederOfChapter2[6]);
orederOfChapter2[6].after(orederOfChapter2[8]);

orederOfChapter5[1].after(orederOfChapter5[9]);
orederOfChapter5[7].after(orederOfChapter5[5]);
orederOfChapter5[4].after(orederOfChapter5[2]);

const li = document.createElement('li');
li.textContent = 'Глава 8: За пределами ES6';
addChapter6[8].append(li);