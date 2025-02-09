function getTimes() {
    let tempos = localStorage.getItem("tempos");
    //string para array
    let temposArray = tempos.split(",");
    
    return temposArray;
}

temposArray = getTimes();

let workouts = [
    { name: "Alta Intensidade", duration:temposArray[0], count: 0 },
    { name: "Descanso", duration: temposArray[1], count: 0 },
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

    //salva o tempo total no local storage
    localStorage.setItem("tempoTotal", totalTimeDisplay.textContent);

    currentPhase = 0;
    timeLeft = workouts[currentPhase].duration;
    updateDisplay();
    updateHistoryList();
    
    startPauseBtn.textContent = "Iniciar";
    isRunning = false;

    //redireciona para a página de resultados
    window.location.href = "results.html";
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

// Wake Lock API - mantém a tela ativa
let wakeLock = null;

async function requestWakeLock() {
    try {
        wakeLock = await navigator.wakeLock.request("screen");
        console.log("Tela mantida ativa!");

        // Se a Wake Lock for solta (por exemplo, se o usuário minimiza o app)
        wakeLock.addEventListener("release", () => {
            console.log("Wake Lock liberada!");
        });
    } catch (err) {
        console.error("Erro ao ativar Wake Lock:", err);
    }
}

// Ativar Wake Lock quando a página carregar
document.addEventListener("DOMContentLoaded", requestWakeLock);

// Reativar Wake Lock se a aba for reaberta
document.addEventListener("visibilitychange", () => {
    if (wakeLock !== null && document.visibilityState === "visible") {
        requestWakeLock();
    }
});


// Eventos
startPauseBtn.addEventListener("click", startPauseTimer);
resetBtn.addEventListener("click", resetTimer);
updateDisplay();