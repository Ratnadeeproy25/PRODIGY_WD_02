let [milliseconds, seconds, minutes] = [0, 0, 0];
let timerRef = document.querySelector('.time');
let int = null;

const startBtn = document.querySelector('.start');
const resetBtn = document.querySelector('.reset');
const lapBtn = document.querySelector('.lap');
const clearBtn = document.querySelector('.clear');

startBtn.addEventListener('click', () => {
    if (int === null) {
        int = setInterval(displayTimer, 10);
        startBtn.textContent = 'Stop';
        lapBtn.classList.remove('visibility');
        resetBtn.classList.add('visibility');
    } else {
        clearInterval(int);
        int = null;
        startBtn.textContent = 'Start';
        lapBtn.classList.add('visibility');
        resetBtn.classList.remove('visibility');
    }
});

resetBtn.addEventListener('click', () => {
    clearInterval(int);
    [milliseconds, seconds, minutes] = [0, 0, 0];
    timerRef.innerHTML = '<span class="text min">00:</span><span class="text sec">00:</span><span class="text msec">00</span>';
    int = null;
    startBtn.textContent = 'Start';
    lapBtn.classList.add('visibility');
    clearBtn.classList.add('visibility');
    document.querySelector('.laps').innerHTML = '';
});

lapBtn.addEventListener('click', () => {
    let laps = document.querySelector('.laps');
    let lapItem = document.createElement('li');
    lapItem.className = 'lap-item';
    lapItem.innerHTML = timerRef.innerHTML;
    laps.appendChild(lapItem);
    clearBtn.classList.remove('visibility');
});

clearBtn.addEventListener('click', () => {
    document.querySelector('.laps').innerHTML = '';
    clearBtn.classList.add('visibility');
});

function displayTimer() {
    milliseconds += 10;
    if (milliseconds == 1000) {
        milliseconds = 0;
        seconds++;
        if (seconds == 60) {
            seconds = 0;
            minutes++;
        }
    }
    let m = minutes < 10 ? '0' + minutes : minutes;
    let s = seconds < 10 ? '0' + seconds : seconds;
    let ms = milliseconds < 10 ? '00' + milliseconds : milliseconds < 100 ? '0' + milliseconds : milliseconds;

    timerRef.innerHTML = `<span class="text min">${m}:</span><span class="text sec">${s}:</span><span class="text msec">${ms}</span>`;
}
