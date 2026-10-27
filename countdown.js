const timerDisplay = document.getElementById("time");
const startButton = document.getElementById("startBtn");
const resetButton = document.getElementById("resetBtn");
const softButton = document.getElementById("softBtn");
const jammyButton = document.getElementById("jammyBtn");
const mediumButton = document.getElementById("mediumBtn");
const hardButton = document.getElementById("hardBtn");
const timerView = document.getElementById("timer-view");
const selectionView = document.getElementById("selection-view");

const escapeHTMLPolicy = trustedTypes.createPolicy("myEscapePolicy", {
  createHTML: (string) => string.replace(/\</g, "&lt;"),
});

let isRunning = false;
let interval;
let minutes = 0;
let seconds = 0;

function updateTimer() {
    let trusted = escapeHTMLPolicy.createHTML(`${minutes}:${seconds < 10 ? '0' + seconds : seconds}`);
    if (trusted instanceof TrustedHTML) {
        console.log(trusted instanceof TrustedHTML)
        timerDisplay.innerHTML = trusted
    }
    else console.log("Not trusted")
}

startButton.addEventListener("click", function() {
    if(!isRunning) {
        isRunning = true;
        startButton.textContent = "Stop";        
        interval = setInterval(() => {
            
            if (seconds > 0 || minutes > 0) {
                if(seconds > 0 && minutes > 0)seconds--;
                if (seconds === 0 && minutes > 0 ) {
                    seconds = 59;
                    minutes--;
                }
                updateTimer();
            }
            
        }, 1000)
    }   else {
            clearInterval(interval);
            isRunning = false;
            startButton.textContent = "Start";
        }
});

resetButton.addEventListener("click", function() {
    clearInterval(interval);
    isRunning = false;
    minutes = 0;
    seconds = 0;
    updateTimer();
    startButton.textContent = "Start";
    timerView.classList.add('hidden');
    selectionView.classList.remove('hidden');
});

softButton.addEventListener("click", function() {
    clearInterval(interval);
    isRunning = false;
    minutes = 6;
    seconds = 0;
    updateTimer();
    startButton.textContent = "Start";
    selectionView.classList.add('hidden');
    timerView.classList.remove('hidden');
});

jammyButton.addEventListener("click", function() {
    clearInterval(interval);
    isRunning = false;
    minutes = 8;
    seconds = 0;
    updateTimer();
    startButton.textContent = "Start";
    selectionView.classList.add('hidden');
    timerView.classList.remove('hidden');
});

mediumButton.addEventListener("click", function() {
    clearInterval(interval);
    isRunning = false;
    minutes = 10;
    seconds = 0;
    updateTimer();
    startButton.textContent = "Start";
    selectionView.classList.add('hidden');
    timerView.classList.remove('hidden');
});

hardButton.addEventListener("click", function() {
    clearInterval(interval);
    isRunning = false;
    minutes = 12;
    seconds = 0;
    updateTimer();
    startButton.textContent = "Start";
    selectionView.classList.add('hidden');
    timerView.classList.remove('hidden');
});