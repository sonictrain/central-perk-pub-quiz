const timerEl = document.getElementById('time');
const startQuiz = document.getElementById('start');
const startScreen = document.getElementById('start-screen');
const questionScreen = document.getElementById('questions');
const endScreen = document.getElementById('end-screen');
const questionTitle = document.getElementById('question-title');
const choiceDiv = document.getElementById('choices');

// TEST VARIABLES START
const addBtn = document.getElementById('add');
const removeBtn = document.getElementById('remove');
// TEST VARIABLES END

let timeLeft = 60;

let currentQuestionID = 1;

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

startQuiz.addEventListener("click", function() {
    startScreen.classList.remove('show');
    startScreen.classList.add('hide');
    questionScreen.classList.remove('hide');
    questionScreen.classList.add('show');

    displayQuestion();
    countdown();
})

function displayQuestion() {
    
    // find the question object
    questionObj = questions.find(q => q.id === currentQuestionID);

    // get the question value and display it
    questionTitle.textContent = questionObj.question;

    // render the options value
    for (let i = 0; i < questionObj.options.length; i++) {
        const btn = document.createElement("button");
        const option = document.createTextNode(questionObj.options[i]);
        btn.classList.add('choices');
        btn.appendChild(option);
        choiceDiv.appendChild(btn);
    }
    currentQuestionID ++;
}

addBtn.addEventListener("click", function() {
    timeLeft += 15;
})
removeBtn.addEventListener("click", function() {
    timeLeft -= 15;
})