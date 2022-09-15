import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  form: document.querySelector('.form'),
  delay: document.querySelector('input[name=delay]'),
  step: document.querySelector('input[name=step]'),
  amount: document.querySelector('input[name=amount]'),
};

refs.form.addEventListener('submit', onFormSubmit);

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;

      if (shouldResolve) {
  
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function onFormSubmit(evt) {
  evt.preventDefault();

  let inpDelay = Number(refs.delay.value);
  let inpStep = Number(refs.step.value);
  let inpAmount = Number(refs.amount.value);

  for (let value = 1; value <= inpAmount; value += 1) {
    createPromise(value, inpDelay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    inpDelay += inpStep;
  }
}



// с КОММЕНТАРИЯМИ=====================================================================================================
// // импортируем библиотеку оповещений (всплывающие окна)
// import { Notify } from 'notiflix/build/notiflix-notify-aio';

// // получаем ссылки на DOM-дерево
// const refs = {
//   form: document.querySelector('.form'),
//   delay: document.querySelector('input[name=delay]'),
//   step: document.querySelector('input[name=step]'),
//   amount: document.querySelector('input[name=amount]'),
// };

// // устанавливаем слушателя на кнопку отправки формы, после чего будет 
// // отрабатывать ф-я onFormSubmit
// refs.form.addEventListener('submit', onFormSubmit);

// // Ф-я создания промиса 
// function createPromise(position, delay) {
//   // возврат промиса (вернется в место вызова ф-ии createPromise(value, inpDelay) )
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       const shouldResolve = Math.random() > 0.3;

//       if (shouldResolve) {
  // в resolve можно вернуть только одно значение: число, строку, или объект (что мы и делаем)!!!!!!!! //
//         resolve({ position, delay });
//       } else {
//         reject({ position, delay });
//       }
//     }, delay);
//   });
// }

// // Ф-я отправки формы
// function onFormSubmit(evt) {
//   // отклюяаем перезагрузку страницы при отправке формы
//   evt.preventDefault();

//   // в переменные запишем значения, которые будем вводить в инпуты нашей формы,
//   // чтобы далее работать с ними в цыкле
// также все значения приводим к числам, т.к. по умолчанию они будут строками,
// что может усложнить работу в цикле особенно тогда, когда число нужно сложить,
// ведь строки складываются по другому (конкатенация строк)
//   let inpDelay = Number(refs.delay.value);
//   let inpStep = Number(refs.step.value);
//   let inpAmount = Number(refs.amount.value);


//   // далее, через цикл for переберем элементы нашей формы,
//   // где value = 1 - начальная итерация, value <= evtAmount - количество итераций,
//   // которое необходимо осуществить (не больше, чем мы ввели в инпут amount)
//   for (let value = 1; value <= inpAmount; value += 1) {
//     // Вызываем ф-ю createPromise внутри цикла, передавая в параметр position аргумент value -->
//     // (при отображении каждого промиса его номером(position) и будет value)
//     // а в параметр delay каждый раз будем передавать новое значение - аргумент inpDelay,
//     // который при каждой итерации будет увеличиваться на inpStep - шаг задержки, который мы вводим в форму 
//     createPromise(value, inpDelay)
//       // при успешном промисе будем выводить след. сообщение
// то есть в then мы передаем значение из resolve - то есть объект
//       .then(({ position, delay }) => {
  // к значеним объекта обращаемся через их свойства - position и delay
//         Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
//         console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
//       })
//       // при неуспешном промисе будем выводить след. сообщение
// то есть в catch мы передаем значение из reject - то есть объект
//       .catch(({ position, delay }) => {
//         Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
//         console.log(`❌ Rejected promise ${position} in ${delay}ms`);
//       });
//     inpDelay += inpStep;
//   }
// }


































