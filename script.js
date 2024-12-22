const minuteText = document.querySelector(".minute"),
  secondText = document.querySelector(".second"),
  millisecondText = document.querySelector(".millisecond"),
  btnStart = document.querySelector(".start"),
  btnPause = document.querySelector(".pause"),
  btnReset = document.querySelector(".reset"),
  btnFixIt = document.querySelector(".fix-it"),
  fixItBox = document.querySelector(".fix-it-box");

let minute = 0,
  second = 0,
  millisecond = 0,
  counter = 1;

// переменная секундомер
let stopwatch, showStopwatch;

// добавление времени
function addTime() {
  // добавление миллисекунд
  if (++millisecond === 100) {
    millisecond = 0;
    // аналогично для секунд
    if (++second === 60) {
      minute++;
      second = 0;
    }
  }
  // для минут, если минут становится 100, то прост перестаем прибавлять
  if (minute === 100) minute = 99;
}

// функция старт
function start() {
  stopwatch = setInterval(addTime, 10);
  showStopwatch = setInterval(showTime, 10);
}

// фукнция пауза
function pause() {
  clearInterval(stopwatch);
  clearInterval(showStopwatch);
}

// функция сброс
function reset() {
  millisecondText.textContent =
    secondText.textContent =
    minuteText.textContent =
      "00";
  millisecond = second = minute = 0;
}

// приравнивание к 2м символам время
function twoSymbols(time) {
  return time < 10 ? "0" + time : time;
}

// вывод времени на страницу
function showTime() {
  millisecondText.textContent = twoSymbols(millisecond);
  secondText.textContent = twoSymbols(second);
  minuteText.textContent = twoSymbols(minute);
}

// показ зафиксированного времени
function showFixIt() {
  const p = document.createElement("p");
  p.classList.add("show-time");
  p.textContent = `${counter++} - ${minuteText.textContent}:${
    secondText.textContent
  }:${millisecondText.textContent}`;
  console.log(p);
  fixItBox.insertAdjacentElement("beforeend", p);
}

// функция фиксирования времени
function fixIt() {
  fixItBox.classList.remove("hidden");
  showFixIt();
}

// клик по кнопке старт
btnStart.addEventListener("click", start);

// клик по кнопке пауза
btnPause.addEventListener("click", pause);

// клик по кнопке сброс
btnReset.addEventListener("click", () => {
  pause();
  reset();
  fixItBox.classList.add("hidden");
  fixItBox.innerHTML = "";
  counter = 1;
});

// клик по кнопке зафиксировать
btnFixIt.addEventListener("click", fixIt);
