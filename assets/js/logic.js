const timerEl = document.getElementById('time');
const startQuiz = document.getElementById('start');
const startScreen = document.getElementById('start-screen');
const questionScreen = document.getElementById('questions');
const endScreen = document.getElementById('end-screen');
const questionTitle = document.getElementById('question-title');
const choicesDiv = document.getElementById('choices');

let timeLeft = 60;

let currentQuestionID = 1;

function countdown() {

    const timeInterval = setInterval(function () {

        timeLeft--; // time decrement
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

function extraTime(s) {
    timeLeft += s;
};

function displayQuestion() {

    // find the question object
    questionObj = questions.find(q => q.id === currentQuestionID);

    // get the question value and display it
    questionTitle.textContent = questionObj.question;

    // render the options value
    for (let i = 0; i < questionObj.options.length; i++) {

        const btn = document.createElement("button");
        const option = document.createTextNode(questionObj.options[i]);

        btn.dataset.answer = questionObj.options[i];
        btn.appendChild(option);

        choicesDiv.appendChild(btn);
    }
}

startQuiz.addEventListener("click", function () {
    startScreen.classList.remove('show');
    startScreen.classList.add('hide');
    questionScreen.classList.remove('hide');
    questionScreen.classList.add('show');

    displayQuestion();
    countdown();
})

choicesDiv.addEventListener("click", function (e) {

    const element = e.target;

    // If the element is a button
    if (element.matches("button")) {
        // render the new question based on the new question ID
        questionObj = questions.find(q => q.id === currentQuestionID);

        // handle extraTime base on the answer
        element.dataset.answer === questionObj.answer ? extraTime(15) : extraTime(-15);

        // wipe choices container before populate it with the next question
        choicesDiv.innerHTML = '';

        if (currentQuestionID < 10) {

            // increase question ID to display the next question
            currentQuestionID++;
            displayQuestion();

        } else {

            // hide question screen and show end screen
            questionScreen.classList.remove('show');
            questionScreen.classList.add('hide');
            endScreen.classList.remove('hide');
            endScreen.classList.add('show');
        }
    }
});