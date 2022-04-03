const NUM_SCORES_SHOWN = 5;
const HIGH_SCORES = 'highScores';
const HIGH_SCORE_LIST = document.getElementById(HIGH_SCORES);

loadCurrentScore = () => {
  let mostRecentScore = localStorage.getItem('mostRecentScore') ?? null;

  // load the high scores
  const highScoreString = localStorage.getItem(HIGH_SCORES);
  const highScores = JSON.parse(highScoreString) ?? [];
  const lowestScore = highScores[9]?.score ?? 0;

  if (mostRecentScore > lowestScore) {
    saveHighScore(mostRecentScore, highScores); 
    showHighScores(); 
  } else {
    showHighScores()
  }

  function saveHighScore(score, highScores) {
    const name = prompt('You got a highscore! Enter name:');
    const newScore = { score, name };
    
    // add the new score to the list of scores
    highScores.push(newScore);
    console.log(highScores, "new high scores")

    // sort the list in order of score 
    highScores.sort((a, b) => b.score - a.score);

    // remove the last item in the list (since it's not longer a high score!)
    highScores.splice(NUM_SCORES_SHOWN);
    console.log(highScores, "top 5 scores after splicing")

    // save the new list
    localStorage.setItem(HIGH_SCORES, JSON.stringify(highScores));
  };

  function showHighScores() {
    const highScores = JSON.parse(localStorage.getItem(HIGH_SCORES)) ?? [];
  
    console.log(highScores)
    console.log(HIGH_SCORE_LIST)

    HIGH_SCORE_LIST.innerHTML = highScores
      .map((score) => `<li>${score.score} - ${score.name}`)
      .join("");
  }
}


loadCurrentScore() 