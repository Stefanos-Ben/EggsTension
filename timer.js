const timerDisplay = document.getElementById("time");
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
};

function runTimer() {
    isRunning = true;    
    interval = setInterval(() => {
        if (seconds > 0 || minutes > 0) {
            if(seconds > 0 && minutes > 0)seconds--;
            if (seconds === 0 && minutes > 0 ) {
                seconds = 59;
                minutes--;
            }
            updateTimer();
        }           
    }, 1000);
}

function navigateTo(view) {
    if (view === 'timer') {
        selectionView.classList.add('hidden');
        timerView.classList.remove('hidden');
    } else {
        clearInterval(interval);
        timerView.classList.add('hidden');
        selectionView.classList.remove('hidden');
    }
}

resetButton.addEventListener("click", function() {
    isRunning = false;
    navigateTo('selection');
});

softButton.addEventListener("click", function() {
    minutes = 6;
    seconds = 0;
    updateTimer();
    runTimer();
    navigateTo('timer');
});

jammyButton.addEventListener("click", function() {
    minutes = 8;
    seconds = 0;
    updateTimer();
    runTimer();
    navigateTo('timer');
});

mediumButton.addEventListener("click", function() {
    minutes = 10;
    seconds = 0;
    updateTimer();
    runTimer();
    navigateTo('timer');
});

hardButton.addEventListener("click", function() {
    clearInterval(interval);
    isRunning = false;
    minutes = 12;
    seconds = 0;
    updateTimer();
    runTimer();
    navigateTo('timer');
});