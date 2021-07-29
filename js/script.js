'use strict';

class DomElement {
    constructor(selector, height, width, bg, fontSize) {
        this.selector = selector;
        this.height = height;
        this.width = width;
        this.bg = bg;
        this.fontSize = fontSize;
    }

    init() {
        let elem;

        if (this.selector[0] === '.') {
            elem = document.createElement('div');
            elem.classList.add(this.selector.slice(1));
        } else if (this.selector[0] === '#') {
            elem.document.createElement('p');
            elem.setAttribute('id', `${this.selector.slice(1)}`);
        } else {
            console.error('Не тот селектор');
        }

        elem.style.cssText = `
            height: ${this.height};
            width: ${this.width};
            bg: ${this.bg};
            fontSize: ${this.fontSize};
        `;

        elem.textContent = prompt('Введите Ваш текст сюда');
        document.body.append(elem);
    }
}

const domElem = new DomElement('.block', '200px', '200px', 'blue', '18px');
domElem.init();