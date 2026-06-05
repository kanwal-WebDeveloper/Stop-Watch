// DOM Elements
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");
const startBtn = document.getElementById("startBtn");
const resetBtn = document.getElementById("resetBtn");
const lapBtn = document.getElementById("lapBtn");
const playIcon = document.getElementById("playIcon");
const btnText = document.getElementById("btnText");
const lapList = document.getElementById("lapList");
const lapCountText = document.getElementById("lapCountText");

// Timer State
let seconds = 0;
let minutes = 0;
let hours = 0;
let timer = null;
let running = false;
let lapCount = 0;

// Update Display (HH:MM:SS)
function updateDisplay() {
    hoursEl.innerText = String(hours).padStart(2, '0');
    minutesEl.innerText = String(minutes).padStart(2, '0');
    secondsEl.innerText = String(seconds).padStart(2, '0');
}

// Get formatted current time
function getCurrentTime() {
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

// Start Timer
function startTimer() {
    if (timer) clearInterval(timer);
    timer = setInterval(() => {
        seconds++;
        if (seconds === 60) {
            seconds = 0;
            minutes++;
        }
        if (minutes === 60) {
            minutes = 0;
            hours++;
        }
        updateDisplay();
    }, 1000);
    running = true;
    playIcon.classList.remove("fa-play");
    playIcon.classList.add("fa-pause");
    btnText.innerText = "Pause";
}

// Pause Timer
function pauseTimer() {
    if (timer) {
        clearInterval(timer);
        timer = null;
    }
    running = false;
    playIcon.classList.remove("fa-pause");
    playIcon.classList.add("fa-play");
    btnText.innerText = "Start";
}

// Reset Everything
function resetEverything() {
    if (timer) {
        clearInterval(timer);
        timer = null;
    }
    running = false;
    hours = 0;
    minutes = 0;
    seconds = 0;
    lapCount = 0;
    updateDisplay();
    playIcon.classList.remove("fa-pause");
    playIcon.classList.add("fa-play");
    btnText.innerText = "Start";
    lapCountText.innerText = "0 Laps";
    lapList.innerHTML = `<div class="empty-lap">✨ No lap records yet</div>`;
}

// Save a Lap
function saveLap() {
    // Do not record lap if timer is at zero
    if (hours === 0 && minutes === 0 && seconds === 0) return;

    // Remove empty placeholder if present
    const emptyDiv = document.querySelector(".empty-lap");
    if (emptyDiv && lapList.contains(emptyDiv)) {
        emptyDiv.remove();
    }

    lapCount++;
    const currentTime = getCurrentTime();

    const li = document.createElement("li");
    li.className = "lap-item";
    li.innerHTML = `
        <div class="lap-left">
            <div class="lap-number">${lapCount}</div>
            <div class="lap-text">
                <h4>Lap ${lapCount}</h4>
                <p>recorded</p>
            </div>
        </div>
        <div class="lap-time">${currentTime}</div>
    `;
    lapList.prepend(li);
    lapCountText.innerText = `${lapCount} Lap${lapCount !== 1 ? 's' : ''}`;
    
    // Auto-scroll to top of lap container
    const lapContainer = document.querySelector(".lap-container");
    if (lapContainer) lapContainer.scrollTop = 0;
}

// Event Listeners
startBtn.addEventListener("click", () => {
    if (!running) startTimer();
    else pauseTimer();
});

resetBtn.addEventListener("click", resetEverything);

lapBtn.addEventListener("click", () => {
    if (hours === 0 && minutes === 0 && seconds === 0) return;
    saveLap();
});

// Initial Display
updateDisplay();
