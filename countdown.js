const timerDisplay = document.getElementById("time");
const startButton = document.getElementById("startBtn");
const resetButton = document.getElementById("resetBtn");
const fiveButton = document.getElementById("fiveBtn");
const tenButton = document.getElementById("tenBtn");

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
});

fiveButton.addEventListener("click", function() {
    clearInterval(interval);
    isRunning = false;
    minutes = 5;
    seconds = 0;
    updateTimer();
    startButton.textContent = "Start";
});

tenButton.addEventListener("click", function() {
    clearInterval(interval);
    isRunning = false;
    minutes = 10;
    seconds = 0;
    updateTimer();
    startButton.textContent = "Start"; 
})