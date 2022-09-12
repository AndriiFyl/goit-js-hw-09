// После установки импортируем библиотеку
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';


const refs = {
  startBtn: document.querySelector('button[data-start]'),
  inputEl: document.querySelector('#datetime-picker'),

  interface: {
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]'),
  } 
};

refs.startBtn.setAttribute('disabled', 'true');
refs.startBtn.addEventListener('click', onClickBtnStartTime);
let intervalId = null;

const options = {
  enableTime: true, //выбор времени
  time_24hr: true,  // 24-й режим
  defaultDate: new Date(),  // начальный выбор даты (на сегод. день)
  minuteIncrement: 1, // шаг ввода минут
  
  onClose(selectedDates) {  // ф-я для запуска при закрытии календаря===========================================
    if (selectedDates[0] < Date.now()) {
      refs.startBtn.setAttribute('disabled', 'true');
      Notify.failure('Please choose a date in the future');
    } else if (selectedDates[0] > Date.now())  {
      refs.startBtn.removeAttribute('disabled', 'true');
    }
  },
};

refs.startBtn.setAttribute('disabled', 'true');
// Ф-я flatpickr: первый параметр - #datetime-picker - елемент инпут для ===========================================
// выбора даты из HTML
flatpickr('#datetime-picker', options);

// ф-я запуска таймера при нажатии на кнопеу start===================================================================
function onClickBtnStartTime() {
  refs.startBtn.setAttribute('disabled', 'true');
  refs.inputEl.setAttribute('disabled', 'true');
  intervalId = setInterval(() => {
    
    const selectedTime = new Date(refs.inputEl.value);
    const deltaTime = selectedTime - Date.now();
    
    if (deltaTime <= 1000) {
      clearInterval(intervalId);
      refs.startBtn.removeAttribute('disabled', 'true');
      refs.inputEl.removeAttribute('disabled', 'true');
      Notify.success("Time is over!");
    }

    changeInterface(deltaTime);
  }, 1000)
 
}

// Ф-я, которая изменяет интерфейс нашего таймера=================================================================
function changeInterface(deltaTime) {
  
  const data = convertMs(deltaTime);
  Object.entries(data).forEach(([key, value]) => {
    refs.interface[key].textContent = addLeadingZero(value);
 })
}

// ф-я для подсчета значений для интерфейса нашего таймера (дана в условии к задачt)================================
// ms - в этой ф-ии - это разница между конечной и текущей датой в миллисекундах (наша deltatime )
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

// ф-я, которая добавит ноль перед цифрой, чтобы получить=============================================================
// значение 02, 03 и т.д.
function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}









// С КОММЕНТАРИЯМИ
// ====================================================================================================================
// ====================================================================================================================
// // После установки импортируем библиотеку===========================================================================
// import flatpickr from "flatpickr";
// import "flatpickr/dist/flatpickr.min.css";
// import { Notify } from 'notiflix/build/notiflix-notify-aio';

// // получаем сылки на файлы из HTML: кнопка и инпут
// const refs = {
//   startBtn: document.querySelector('button[data-start]'),
//   inputEl: document.querySelector('#datetime-picker'),

//   interface: {
//     days: document.querySelector('[data-days]'),
//     hours: document.querySelector('[data-hours]'),
//     minutes: document.querySelector('[data-minutes]'),
//     seconds: document.querySelector('[data-seconds]'),
//   }
// };
// // при загрузке страницы кнопка start неактивна
// refs.startBtn.setAttribute('disabled', 'true');
// // ставим шлуталя на кнопку, после чего будет вызываться ф-я
// refs.startBtn.addEventListener('click', onClickBtnStartTime);
// // определяем дефолтное значения для идентификатора нашего интервала (setIntervalId);
// let intervalId = null;

// const options = {
//   enableTime: true, //выбор времени
//   time_24hr: true,  // 24-й режим
//   defaultDate: new Date(),  // начальный выбор даты (на сегод. день)
//   minuteIncrement: 1, // шаг ввода минут
  
//   onClose(selectedDates) {  // ф-я для запуска при закрытии календаря
    
//   //  Если выбрання дата < текущей, то кнопу start делаем неактивной
//     if (selectedDates[0] < Date.now()) {
//       refs.startBtn.setAttribute('disabled', 'true');
// // Сделали через библиотеку notiflix - стилизация всплывающих окон
// // можно было так, без библиотеки: window.alert('Please choose a date in the future');
//       Notify.failure('Please choose a date in the future');
//       // window.alert('Please choose a date in the future');
//       //  Если выбрання дата > текущей, то кнопу start активируем
//     } else if (selectedDates[0] > Date.now())  {
//       refs.startBtn.removeAttribute('disabled', 'true');
//     }
    
//     // selectedDates - массив [Tue Sep 27 2022 11:43:00 GMT+0300 (Восточная Европа, летнее время)]
//     // selectedDates[0] - строка массива Tue Sep 27 2022 11:43:00 GMT+0300 (Восточная Европа, летнее время)
//     // console.log(selectedDates[0]); 
//   },
// };
// refs.startBtn.setAttribute('disabled', 'true');
// // Ф-я flatpickr: первый параметр - #datetime-picker - елемент инпут для 
// // выбора даты из HTML
// flatpickr('#datetime-picker', options);

// // ф-я запуска таймера при нажатии на кнопеу start
// function onClickBtnStartTime() {
//   // после клика на start - делаем кнопку неактивной
//   refs.startBtn.setAttribute('disabled', 'true');
//   refs.inputEl.setAttribute('disabled', 'true');
//   //  установим интервал - 1 сек (для отсчета времени)
//   intervalId = setInterval(() => {
//     // в переменную selectedTime запишем время выбранное в инпуте - refs.inputEl.value --->
//     // значение в формате 2022-09-11 13:21, которое нужно перевести в формат --->
//     // Wed Sep 14 2022 13:22:00 GMT+0300 (Восточная Европа, летнее время), чтобы можно
//     // было посчитать разницу между выбранным временем(selectedTime) и текущим - Date.now() (т.к. текущее время у нас
//     // записывается в ms - Date.now())
//     const selectedTime = new Date(refs.inputEl.value);
//     // в deltaTime запишем разницу между выдбранной и текущей датами
//     const deltaTime = selectedTime - Date.now();
    
//     // ставим условие, что если разница во времени между выбранной датой и текущей составит меньше равно 1 сек,
//     // то есть deltatime, то мы останавливаем счетчик (интервал)
//     if (deltaTime <= 1000) {
//       clearInterval(intervalId);
//       refs.startBtn.removeAttribute('disabled', 'true');
//       refs.inputEl.removeAttribute('disabled', 'true');
//       Notify.success("Time is over!");
//     }


//     // Вызываем ф-ю changeInterface, которая изменяет интерфейс нашего таймера
//     changeInterface(deltaTime);
   
//   }, 1000)
 
// }

// // Ф-я, которая изменяет интерфейс нашего таймера
// function changeInterface(deltaTime) {
//   // визываем функцию convertMs, передавая ей как аргумент нашу deltaTime -
//   // разницу между текущим временим и запланированным (которое мы выбрали)
//   // и в переменную data запишем объект такого вида - {days: 10, hours: 23, minutes: 59, seconds: 34},
//   // то есть ф-я convertMs возвращает такой объект
//   const data = convertMs(deltaTime);
//   // Далее из такого объекта нам необходимо получить ключи их значения:
//   // сначала через Object.entries мы получаем массив массивов: [['days', 10], ['hours', 23], ['minutes', 59],['seconds', 49]] 
//   // далее через forEach мы переберем каждый елемент массива и получим отдельные независимые массивы:
//   // ['days', 10] ['hours', 23]  ['minutes', 59] ['seconds', 49]
//   // [key, value] - это item, просто мы сразу же провели деструктуризацию
//   // массива
//   Object.entries(data).forEach(([key, value]) => {
//     // в наш объект refs, в его внут объект interface в каждое из значений
//     // (days, hours, minutes, seconds) через ключ [key] мы будем перезаписывать значение
//     // в каждом елементе нашего интерфейса addLeadingZero(value).
//     refs.interface[key].textContent = addLeadingZero(value);
//  })
// }



// // ф-я для подсчета значений для интерфейса нашего таймера (дана в условии к задачt)
// // ms - в этой ф-ии - это разница между конечной и текущей датой в миллисекундах (наша deltatime )
// function convertMs(ms) {
//   // Number of milliseconds per unit of time
//   const second = 1000;
//   const minute = second * 60;
//   const hour = minute * 60;
//   const day = hour * 24;

//   // Remaining days
//   const days = Math.floor(ms / day);
//   // Remaining hours
//   const hours = Math.floor((ms % day) / hour);
//   // Remaining minutes
//   const minutes = Math.floor(((ms % day) % hour) / minute);
//   // Remaining seconds
//   const seconds = Math.floor((((ms % day) % hour) % minute) / second);

//   return { days, hours, minutes, seconds };
// }

// // ф-я, которая добавит ноль перед цифрой, чтобы получить
// // значение 02, 03 и т.д.
// function addLeadingZero(value) {
//   return value.toString().padStart(2, '0');
// }