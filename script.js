const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#ProgressBarFull');
const timer = document.querySelector("#timer");

let questions = [
  {
    question: 'Which of the following is visible only within a function where it is defined?',
    choice1: 'global variable',
    choice2: 'local variable',
    choice3: 'both of the above',
    choice4: 'none of the above',
    answer: 2,
  },
  {
    question: 'Which built-in method returns the string representation of the numbers value?',
    choice1: 'toValue()',
    choice2: 'toNumber()',
    choice3: 'toString()',
    choice4: 'none of the above',
    answer: 3,
  },
  {
    question: 'Which of the following function of string object extracts a section of a string and returns a new string?',
    choice1: 'slice()',
    choice2: 'split()',
    choice3: 'replace()',
    choice4: 'search()',
    answer: 1,
  },
  {
    question: 'Which of the following function of string object returns the calling string value converted to lower case?',
    choice1: 'toLocaleLowerCase',
    choice2: 'toLowerCase()',
    choice3: 'toString()',
    choice4: 'substring()',
    answer: 2,
  },
  {
    question: 'Which of the following function of Array object adds and/or removes elements from an array?',
    choice1: 'toSource()',
    choice2: 'sort()',
    choice3: 'splice()',
    choice4: 'unshift()',
    answer: 3,
  },
  {
    question: 'Which of the following methods is used to access HTML elements using Javascript?',
    choice1: 'getElementbyId()',
    choice2: 'getElementsByClassName()',
    choice3: 'both a and b',
    choice4: 'none of the above',
    answer: 3,
  },
  {
    question: 'Javascript is an ______ language',
    choice1: 'object-oriented',
    choice2: 'object-based',
    choice3: 'prodedural',
    choice4: 'none of the above',
    answer: 1,
  },
  {
    question: 'Which of the following keywords is used to define a variable in Javascript?',
    choice1: 'var',
    choice2: 'let',
    choice3: 'both a and b',
    choice4: 'none of the above',
    answer: 1,
  },
  {
    question: 'Which of the following methods can be used to display data in some form using Javascript?',
    choice1: 'document.write()',
    choice2: 'console.log()',
    choice3: 'window.alert',
    choice4: 'all of the above',
    answer: 4,
  },
  {
    question: 'How can a datatype be declared to be a constant type?',
    choice1: 'const',
    choice2: 'var',
    choice3: 'let',
    choice4: 'constant',
    answer: 4,
  },
]


const SCORE_POINTS = 100;
const MAX_QUESTIONS = 10;
const TIME_PER_QUESTION = 15; // 15 seconds per question

let currentQuestion = {}
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = []
let time = questions.length * TIME_PER_QUESTION;
let timerId;

function startQuiz() {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  timer.innerText = time; // update timer on the DOM
  console.log(availableQuestions)
  timerId = setInterval(clockTick, 1000);
  
  // reset the most recent score to null in local storage
  localStorage.setItem('mostRecentScore', null);


  // start the quiz
  getNewQuestion();
}


function clockTick() {
  console.log(time, "time left")
  time--;
  timer.innerText = time;
  if (time <= 0){
    finishQuiz()
  }
}

/** 
 * This function will be called when the quiz is ended. 
 * It will save the score to local storage. 
 */
finishQuiz = () => {
  // clear timer interval to stop calling it
  clearInterval(timerId);

  // set the current score to local storage
  localStorage.setItem('mostRecentScore', score);
  console.log("Most recent scored of", score, "has been stored to local storage.")
  console.log(localStorage.getItem("mostRecentScore"))

  // navigate to the scores page
  return window.location.assign('./scores.html')
}

getNewQuestion = () => {
  if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS || time <= 0) {
    console.log("End of quiz! no more questions left!")
    // return window.location.assign('./end.html')
    finishQuiz()
  }

  questionCounter++
  // progressText.innerText = 'Question ${questionCounter} of ${MAX_QUESTIONS}'
  // progressBarFull.style.width = '${(questionCounter/max_questions) * 100}%'

  const questionIndex = Math.floor(Math.random() * availableQuestions.length)
  currentQuestion = availableQuestions[questionIndex]
  question.innerText = currentQuestion.question

  choices.forEach(choice => {
    const number = choice.dataset['number']
    choice.innerText = currentQuestion['choice' + number]
  })

  availableQuestions.splice(questionCounter, 1)
  acceptingAnswers = true;
}

choices.forEach(choice => {
  choice.addEventListener("click", function(e)  {
    if(!acceptingAnswers) return

    acceptingAnswers = false
    const selectedChoice = e.target
    const selectedAnswer = selectedChoice.dataset['number']
    console.log("Selected answer is", selectedAnswer, " - Correct answer is", currentQuestion.answer)

    if (selectedAnswer != currentQuestion.answer) {
       // If incorrect...
      if(time < 15) {
        // ..and less than 15 seconds are left.
        clearInterval(timerId);
        time = 0
        timer.innerText = time
      } else {
         // ..more than 15 seconds are left.
        time -= 15
        timer.innerText = time;
      }
    }
    else {
      // Correct...
      incrementScore(SCORE_POINTS);
    }

    getNewQuestion();
  })
})

incrementScore = (num) => {
  score +=num
  scoreText.innerText = score
}



startQuiz();