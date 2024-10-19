// script.js
let startTime, updatedTime, difference;
let timerInterval;
let isRunning = false;

const display = document.getElementById('display');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const laps = document.getElementById('laps');

startButton.addEventListener('click', start);
pauseButton.addEventListener('click', pause);
resetButton.addEventListener('click', reset);
lapButton.addEventListener('click', recordLap);

function start() {
    if (!isRunning) {
        startTime = new Date().getTime() - (difference || 0);
        timerInterval = setInterval(updateTime, 10);
        isRunning = true;
    }
}

function pause() {
    if (isRunning) {
        clearInterval(timerInterval);
        difference = new Date().getTime() - startTime;
        isRunning = false;
    }
}

function reset() {
    clearInterval(timerInterval);
    display.textContent = '00:00:00.00';
    difference = 0;
    isRunning = false;
    laps.innerHTML = '';
}

function updateTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);
    let milliseconds = Math.floor((difference % 1000) / 10);

    hours = (hours < 10) ? '0' + hours : hours;
    minutes = (minutes < 10) ? '0' + minutes : minutes;
    seconds = (seconds < 10) ? '0' + seconds : seconds;
    milliseconds = (milliseconds < 10) ? '0' + milliseconds : milliseconds;

    display.textContent = `${hours}:${minutes}:${seconds}.${milliseconds}`;
}

function recordLap() {
    if (isRunning) {
        const lapTime = display.textContent;
        const lapItem = document.createElement('li');
        lapItem.textContent = lapTime;
        laps.appendChild(lapItem);
    }
}
