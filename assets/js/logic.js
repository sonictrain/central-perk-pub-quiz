const timerEl = document.getElementById('time');
const timerDiv = document.querySelector('#timer');
const startQuiz = document.getElementById('start');
const startScreen = document.getElementById('start-screen');
const questionScreen = document.getElementById('questions');
const endScreen = document.getElementById('end-screen');
const questionTitle = document.getElementById('question-title');
const choicesDiv = document.getElementById('choices');
const initials = document.getElementById('initials');
const submit = document.querySelector('#submit');
const finalScore = document.getElementById('final-score');
const feedback = document.getElementById('feedback');
const endMsg = document.querySelector('#end-screen h2');

const storedScores = JSON.parse(localStorage.getItem("Scores"));

let timeLeft = 60;
let currentQuestionID = 1;

let isSaved = false;

let userObj = {
    initials: "",
    score: 0
};

let scoresObj = [];

function countdown() {

    const timeInterval = setInterval(function () {

        timeLeft=timeLeft-0.01; // time decrement
        timerEl.textContent = Math.round(timeLeft * 100) / 100; // update dom with new timer value

        if (timeLeft < 1 && timeLeft >= 0) {
            timerEl.textContent = timeLeft;
            timerEl.textContent = "0";
            clearInterval(timeInterval); // stop the timer at 0 seconds remaining
            gameOver();

        } else if (timeLeft < 0) {
            timerEl.textContent = "0";
            clearInterval(timeInterval); // stop the timer at 0 seconds remaining 
            gameOver();

        }

    }, 10);

    choicesDiv.addEventListener("click", function (e) {

        const element = e.target;

        // If the element is a button
        if (element.matches("button")) {
            // render the new question based on the new question ID
            questionObj = questions.find(q => q.id === currentQuestionID);
            console.log(`The correct answer is ${questionObj.answer}`);

            // handle extraTime base on the answer
            if (element.dataset.answer === questionObj.answer) {
                console.log(`You selected ${element.dataset.answer} which is the right one.`);
                // show feedbackMessage for 750ms
                feedbackMessage('show', "Correct! ✅", 750);
                console.log(`adding 15 seconds to the timer`);
                extraTime(15);
            } else {
                console.log(`You selected ${element.dataset.answer} which is the wrong one.`);
                // show feedbackMessage for 750ms 
                feedbackMessage('show', "Wrong! ❌", 750);
                console.log(`removing 15 seconds from the timer`);
                extraTime(-15);
            }
            timerEl.textContent = Math.round(timeLeft * 100) / 100;

            if (currentQuestionID < 10) {

                // increase question ID to display the next question
                currentQuestionID++;
                displayQuestion();

            } else {

                // stop timer
                clearInterval(timeInterval);

                // save score
                userObj.score = Math.round(timeLeft * 100) / 100;
                console.log(userObj.score);
                finalScore.innerText = userObj.score;

                // hide question screen and show end screen
                questionScreen.classList.add('hide');
                endScreen.classList.remove('hide');
            }
        }
    });
}

function extraTime(s) {
    timeLeft += s;
};

function displayQuestion() {

    // find the question object
    questionObj = questions[currentQuestionID-1];

    // get the question value and display it
    questionTitle.textContent = questionObj.question;

    // wipe choices container before populate it with the next question
    choicesDiv.innerHTML = '';

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

    startScreen.classList.add('hide');
    questionScreen.classList.remove('hide');

    isSaved = false;

    displayQuestion();
    countdown();
})

submit.addEventListener("click", function () {

    // Return from function early if submitted initials is blank
    if (initials.value.trim() !== "" && isSaved === false) {
        userObj.initials = initials.value.trim();
        isSaved = true;

        saveScore(userObj);
        window.location.href = 'highscores.html';

    } else {
        return;
    }
});

function saveScore(s) {
    if (storedScores !== null) {
        scoresObj = storedScores;
    }
    scoresObj.push(s);
    localStorage.setItem('Scores', JSON.stringify(scoresObj));
};

function feedbackMessage(action, text, millis) {

    if (action === 'hide') {
        // add 'hide' class
        feedback.classList.add('hide');

    } else if (action === 'show') {
        // remove 'hide' class
        feedback.classList.remove('hide');
        // and hide again after a while
        setTimeout(() => {            
            feedback.classList.add('hide');
        }, millis);

    } else {
        console.log("Error, please pass 'hide' or 'show' as first parameter.");
    }

    if (text) {
        feedback.innerText = text;
    }
}

function gameOver() {
    questionScreen.classList.add('hide');
    endScreen.classList.remove('hide');
    
    endMsg.textContent = `GAME OVER! 🫣`;
    finalScore.parentNode.innerHTML = `You can still save your score, even though it's 0, so that you can strive for improvement next time!`;

}