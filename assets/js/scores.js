const ranking = document.getElementById('highscores');
const clear = document.getElementById('clear');

function renderHighscores() {

    // get scores from local storage
    const storedScores = JSON.parse(localStorage.getItem("Scores"));

    // if scores are there, then sort the array and create list items for each of the obj in the array 
    if (storedScores) {

        storedScores.sort((a, b) => b.score - a.score);

        for (let i = 0; i < storedScores.length; i++) {

            const li = document.createElement("li");
            const userRank = document.createTextNode(`${storedScores[i].initials} - ${storedScores[i].score}`);

            li.appendChild(userRank);
            ranking.appendChild(li);
        };
    };
};

renderHighscores();

// clear local storage on click
clear.addEventListener("click", function () {
    localStorage.removeItem("Scores");
    ranking.innerHTML = '';
});