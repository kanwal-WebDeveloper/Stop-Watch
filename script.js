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

/* VARIABLES */

let seconds = 0;
let minutes = 0;
let hours = 0;

let timer = null;
let running = false;

let lapCount = 0;

/* UPDATE DISPLAY */

function updateDisplay(){

    hoursEl.innerText = String(hours).padStart(2,'0');
    minutesEl.innerText = String(minutes).padStart(2,'0');
    secondsEl.innerText = String(seconds).padStart(2,'0');

}

/* GET TIME */

function getCurrentTime(){

    return `${String(hours).padStart(2,'0')}:${String(minutes).padStart(2,'0')}:${String(seconds).padStart(2,'0')}`;

}

/* START TIMER */

function startTimer(){

    timer = setInterval(()=>{

        seconds++;

        if(seconds === 60){
            seconds = 0;
            minutes++;
        }

        if(minutes === 60){
            minutes = 0;
            hours++;
        }

        updateDisplay();

    },1000);

    running = true;

    playIcon.classList.remove("fa-play");
    playIcon.classList.add("fa-pause");

    btnText.innerText = "Pause";

}

/* PAUSE TIMER */

function pauseTimer(){

    clearInterval(timer);

    running = false;

    playIcon.classList.remove("fa-pause");
    playIcon.classList.add("fa-play");

    btnText.innerText = "Start";

}

/* START / PAUSE */

startBtn.addEventListener("click",()=>{

    if(!running){
        startTimer();
    }
    else{
        pauseTimer();
    }

});

/* RESET */

resetBtn.addEventListener("click",()=>{

    clearInterval(timer);

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

    lapList.innerHTML = `
        <div class="empty-lap">
            No lap records yet
        </div>
    `;

});

/* SAVE LAP */

lapBtn.addEventListener("click",()=>{

    if(hours === 0 && minutes === 0 && seconds === 0){
        return;
    }

    /* REMOVE EMPTY */

    if(document.querySelector(".empty-lap")){
        document.querySelector(".empty-lap").remove();
    }

    lapCount++;

    const currentTime = getCurrentTime();

    const li = document.createElement("li");

    li.innerHTML = `

        <div class="lap-left">

            <div class="lap-number">
                ${lapCount}
            </div>

            <div class="lap-text">
                <h4>Lap ${lapCount}</h4>
                <p>Saved Record</p>
            </div>

        </div>

        <div class="lap-time">
            ${currentTime}
        </div>

    `;

    lapList.prepend(li);

    lapCountText.innerText = `${lapCount} Laps`;

});

/* INITIAL */

updateDisplay();
