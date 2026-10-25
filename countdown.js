const timerDisplay = document.getElementById("time");

const escapeHTMLPolicy = trustedTypes.createPolicy("myEscapePolicy", {
  createHTML: (string) => string.replace(/\</g, "&lt;"),
});

let isRunning = false;
let interval;
let minutes = 2;
let seconds = 0;

function updateTimer() {
    let trusted = escapeHTMLPolicy.createHTML(`${minutes}:${seconds < 10 ? '0' + seconds : seconds}`);
    if (trusted instanceof TrustedHTML) {
        console.log(trusted instanceof TrustedHTML)
        timerDisplay.innerHTML = trusted
    }
    else console.log("Not trusted")
}

document.addEventListener("DOMContentLoaded", function() {
    interval = setInterval(() => {
        if(!isRunning) isRunning = true;
        if (seconds > 0 || minutes > 0) {
            if(seconds > 0 && minutes > 0)seconds--;
            if (seconds === 0 && minutes > 0 ) {
                seconds = 59;
                minutes--;
            }
            updateTimer();
        }
        else {
            clearInterval(interval);
            isRunning = false;
        }
    }, 1000)
});