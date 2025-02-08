let workouts = [
    { name: "Alta Intensidade", duration: 30 },
    { name: "Descanso", duration: 15 },
];

let currentPhase = 0;
let timeLeft = workouts[currentPhase].duration;
let timer;
let isRunning = false;

const timerDisplay = document.getElementById("timer");
const startPauseBtn = document.getElementById("startPauseBtn");
const resetBtn = document.getElementById("resetBtn");

function updateDisplay() {
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    timerDisplay.textContent = `${workouts[currentPhase].name}: ${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

function startPauseTimer() {
    if (isRunning) {
        clearInterval(timer);
        startPauseBtn.textContent = "Iniciar";
    } else {
        timer = setInterval(() => {
            if (timeLeft > 0) {
                timeLeft--;
                updateDisplay();
            } else {
                switchPhase();
            }
        }, 1000);
        startPauseBtn.textContent = "Pausar";
    }
    isRunning = !isRunning;
}

function switchPhase() {
    currentPhase = (currentPhase + 1) % workouts.length;
    timeLeft = workouts[currentPhase].duration;
    updateDisplay();
}

function resetTimer() {
    clearInterval(timer);
    currentPhase = 0;
    timeLeft = workouts[currentPhase].duration;
    updateDisplay();
    startPauseBtn.textContent = "Iniciar";
    isRunning = false;
}

startPauseBtn.addEventListener("click", startPauseTimer);
resetBtn.addEventListener("click", resetTimer);
updateDisplay();
