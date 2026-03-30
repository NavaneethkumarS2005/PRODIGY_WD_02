let startTime;
let elapsedTime = 0;
let timerInterval;
let isRunning = false;
let lapCount = 0;

const display = document.getElementById('display');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const lapBtn = document.getElementById('lapBtn');
const resetBtn = document.getElementById('resetBtn');
const lapsList = document.getElementById('lapsList');

function formatTime(timeInMs) {
    const totalSeconds = Math.floor(timeInMs / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    
    const paddedHours = String(hours).padStart(2, '0');
    const paddedMinutes = String(minutes).padStart(2, '0');
    const paddedSeconds = String(seconds).padStart(2, '0');
    
    return `${paddedHours}:${paddedMinutes}:${paddedSeconds}`;
}

function updateDisplay() {
    const currentTime = Date.now();
    const timeToDisplay = elapsedTime + (isRunning ? (currentTime - startTime) : 0);
    display.textContent = formatTime(timeToDisplay);
}

function startTimer() {
    if (isRunning) return;
    
    isRunning = true;
    startTime = Date.now();
    
    timerInterval = setInterval(() => {
        updateDisplay();
    }, 100); 
}

function pauseTimer() {
    if (!isRunning) return;
    
    isRunning = false;
    elapsedTime += Date.now() - startTime;
    clearInterval(timerInterval);
    updateDisplay();
}

function resetTimer() {
    isRunning = false;
    clearInterval(timerInterval);
    elapsedTime = 0;
    lapCount = 0;
    updateDisplay();
    lapsList.innerHTML = '';
}

function recordLap() {
    if (!isRunning) return;
    
    lapCount++;
    const currentTime = Date.now();
    const timeToDisplay = elapsedTime + (currentTime - startTime);
    
    const li = document.createElement('li');
    li.className = 'lap-item';
    
    const lapNumSpan = document.createElement('span');
    lapNumSpan.className = 'lap-number';
    lapNumSpan.textContent = `Lap ${lapCount}`;
    
    const lapTimeSpan = document.createElement('span');
    lapTimeSpan.className = 'lap-time';
    lapTimeSpan.textContent = formatTime(timeToDisplay);
    
    li.appendChild(lapNumSpan);
    li.appendChild(lapTimeSpan);
    
    lapsList.insertBefore(li, lapsList.firstChild);
}

startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);
lapBtn.addEventListener('click', recordLap);
