'use strict';

const root = document.querySelector(':root');
const background = document.querySelector('#background');
const backgroundColor = document.querySelector('.bg--color');
const backgroundImg = document.querySelector('.bg--img');
const textColor = document.querySelector('.text--color');
const fontBtns = [...document.querySelector('.dropdown-content').children];
const allBgImages = document.querySelectorAll('.bg-image');
const clockContainer = document.getElementById('clock');
const dateContainer = document.getElementById('date');
const clockBtn = document.querySelector('#clockBtn');
const dateBtn = document.querySelector('#dateBtn');
const fullScreenBtn = document.getElementById('fullScreen');

//////////////////////////////////
//////////////////////// Clock
///////////////////////////////

const setTime = function () {
  let date = new Date();
  let hour = date.getHours();
  let minute = date.getMinutes();
  let seconds = date.getSeconds();

  if (minute < 10) {
    minute = '0' + minute;
  }
  if (hour < 10) {
    hour = '0' + hour;
  }
  if (seconds < 10) {
    seconds = '0' + seconds;
  }
  clockContainer.textContent = `${hour}•${minute}`;
  setTimeout('setTime()', 100);
  //⁄
};

const setDate = function () {
  let date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  if (day < 10) {
    day = '0' + day;
  }
  if (month < 10) {
    month = '0' + month;
  }
  dateContainer.textContent = `${day}•${month}•${year}`;
  setTimeout('setTime()', 1000);
};

const btnOnOff = function () {
  let container;
  this.id === 'clockBtn'
    ? (container = clockContainer)
    : (container = dateContainer);
  if (this.classList.contains('btn-active')) {
    this.classList.remove('btn-active');
    this.classList.add('btn-inactive');
    container.classList.remove('on');
    container.classList.add('off');
  } else {
    this.classList.add('btn-active');
    this.classList.remove('btn-inactive');
    container.classList.add('on');
    container.classList.remove('off');
  }
};

clockBtn.addEventListener('click', btnOnOff);
dateBtn.addEventListener('click', btnOnOff);

setTime();
setDate();

//////////////////////////////////
//////////////////// Background
///////////////////////////////

/// SOLID COLOR ///
backgroundColor.addEventListener('input', function (e) {
  background.className = '';
  background.style.backgroundImage = '';
  root.style.setProperty('--bg-color', e.target.value);
});

/// Image ///
const imgs = [...backgroundImg.children];
imgs.shift();
imgs.pop();

imgs.forEach((img, i) =>
  img.addEventListener('click', function () {
    background.style.backgroundImage = `url('img/bg${i + 1}.jpg')`;
  })
);

//////////////////////////////////
//////////////////// text
///////////////////////////////

/// COLOR ///
textColor.addEventListener('input', function (e) {
  root.style.setProperty('--text-color', e.target.value);
});

/// FONT ///
fontBtns.forEach(btn =>
  btn.addEventListener('click', function () {
    fontBtns.forEach(a => a.classList.remove('current'));
    btn.classList.add('current');
    root.style.setProperty('--font', btn.value);
  })
);

fullScreenBtn.addEventListener('click', () => {
  document.documentElement.requestFullscreen();
});

['mousemove', 'keydown'].forEach(e =>
  window.addEventListener(e => {
    document.documentElement.exitFullscreen();
  })
);
