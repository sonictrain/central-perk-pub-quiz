const timerEl = document.getElementById('time');
const addBtn = document.getElementById('add');
const removeBtn = document.getElementById('remove');

let timeLeft = 60;

function countdown() {

    const timeInterval = setInterval(function() {

        timeLeft --; // time decrement
        timerEl.textContent = timeLeft; // update dom with new timer value
        
        if (timeLeft < 1 && timeLeft >= 0) {
            timerEl.textContent = timeLeft;
            clearInterval(timeInterval); // stop the timer at 0 seconds remaining 
        } else if (timeLeft < 0) {
            timerEl.textContent = "0";
            clearInterval(timeInterval); // stop the timer at 0 seconds remaining 
        }

    }, 1000);
}

countdown();

addBtn.addEventListener("click", function() {
    timeLeft += 15;
})
removeBtn.addEventListener("click", function() {
    timeLeft -= 15;
})