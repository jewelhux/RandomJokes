let textArea = document.querySelector('.quote-text-span'); // Место куда будет вставляться цитата
let authorArea = document.querySelector('.quote-name-span'); // Место куда будет вставляться автор
let button = document.querySelector('.quote-btn'); // Наша кнопочка для цитаток
let langBtns = document.querySelector('.lang-container'); // Кнопка переключения языка
let langItems = document.querySelectorAll('[data-lng]'); // Кнопка переключения языка
let bodyBg = document.querySelector('.bg'); // Кнопка переключения языка

let currenColorBg;
let bgObj = {
  0: '#FFB6C1',
  1: '#FFA07A',
  2: '#8B0000',
  3: '#2E8B57',
  4: '#BDB76B',
  5: '#696969',
  6: '#000000',
  7: '#2F4F4F',
  8: '#808000',
  9: '#8B008B',
  10: '#191970',
  11: '#BA55D3',
  12: '#778899'
}

// Функция рандомного числа для цитатки
function getRandom(maxNumber) { 
  return Math.floor(Math.random() * maxNumber);
}

// Функция изменения бекграунда
let current = 0;
let last = 0;
function changeBg() {
  let min = 0;
  let max = 12;

  current = Math.floor(Math.random() * (max - min)) + min;
  while (current === last) {
    current = Math.floor(Math.random() * (max - min)) + min;
  }
  last = current;

  bodyBg.style.backgroundColor = bgObj[current];
}

// Функция переключения языка
let url = 'https://type.fit/api/quotes';
let language = 'eng';
langBtns.addEventListener('click', function (event) {
  if(event.target.dataset.lng === "eng") {
    langItems.forEach((item) => item.classList.remove('active'));
    event.target.classList.add('active');
    button.textContent = 'Button';
    language = 'eng';
    getData()
  }
  if(event.target.dataset.lng === "rus") {
    langItems.forEach((item) => item.classList.remove('active'));
    event.target.classList.add('active');
    button.textContent = 'Кнопка';
    language = 'rus';
    getData()
  }
})

// Функция для цитаток
async function getData() {
  let res = await fetch(url);;
  let quotes = './quotes.json';

  if (language === 'rus') {
    res = await fetch(quotes);
  }

  const data = await res.json();
  let maxNumber = data.length;
  let randomNumber = getRandom(maxNumber);

  if (data[randomNumber].author === null) {
    authorArea.textContent = '-';
  }
  else {
    authorArea.textContent = data[randomNumber].author;
  }

  textArea.textContent = data[randomNumber].text;
  changeBg()
}
button.addEventListener('click', getData)
getData()