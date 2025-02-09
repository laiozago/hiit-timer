let workouts = [
    { name: "Alta Intensidade", duration: 3, count: 0 },
    { name: "Descanso", duration: 1, count: 0 },
];

let currentPhase = 0;
let timeLeft = workouts[currentPhase].duration;
let totalElapsedTime = 0;
let timer;
let isRunning = false;

const timerDisplay = document.getElementById("timer");
const totalTimeDisplay = document.getElementById("totalTime");
const startPauseBtn = document.getElementById("startPauseBtn");
const resetBtn = document.getElementById("resetBtn");
const historyList = document.getElementById("historyList");

function updateDisplay() {
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    timerDisplay.textContent = `${workouts[currentPhase].name}: ${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    
    let totalMinutes = Math.floor(totalElapsedTime / 60);
    let totalSeconds = totalElapsedTime % 60;
    totalTimeDisplay.textContent = `Tempo Total: ${totalMinutes}:${totalSeconds < 10 ? "0" : ""}${totalSeconds}`;
}

function startPauseTimer() {
    if (isRunning) {
        clearInterval(timer);
        startPauseBtn.textContent = "Iniciar";
    } else {
        timer = setInterval(() => {
            if (timeLeft > 0) {
                timeLeft--;
                totalElapsedTime++;
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
    // Aumenta o contador daquela fase
    workouts[currentPhase].count++;
    updateHistoryList();

    // Alterna para a próxima fase
    currentPhase = (currentPhase + 1) % workouts.length;
    timeLeft = workouts[currentPhase].duration;
    updateDisplay();
}

function resetTimer() {
    // Para o timer e reseta as variáveis
    clearInterval(timer);
    totalElapsedTime = 0;
    
    workouts.forEach(phase => phase.count = 0); // Reseta os contadores

    currentPhase = 0;
    timeLeft = workouts[currentPhase].duration;
    updateDisplay();
    updateHistoryList();
    
    startPauseBtn.textContent = "Iniciar";
    isRunning = false;
}

function updateHistoryList() {
    historyList.innerHTML = ""; // Limpa a lista

    workouts.forEach(phase => {
        if (phase.count > 0) {
            let listItem = document.createElement("li");
            listItem.textContent = `${phase.name} x ${phase.count}`;
            historyList.appendChild(listItem);
        }
    });
}

// Eventos
startPauseBtn.addEventListener("click", startPauseTimer);
resetBtn.addEventListener("click", resetTimer);
updateDisplay();