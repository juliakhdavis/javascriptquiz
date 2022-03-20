const question = document.querySelector('#question');
const choices = Array.from(document.querySelector('#question'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#ProgressBarFull');

let currentQuestion = {}
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = []

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

const score_points = 100;
const max_questions = 10;

startQuiz = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  getNewQuestion();
}

getNewQuestion = () => {
  if(availableQuestions.length === 0 || questionCounter > max_questions) {
    localStorage.setItem('mostRecentScore', score);

    return window.location.assign('/end.html')
  }

  questionCounter++
  progressText.innterText = 'Question ${questionCounter} of ${max_questions}'
  //progressBarFull.style.width = '${(questionCounter/max_questions) * 100}%'

  const questionIndex = Math.floor(Math.random() * availableQuestions.length)
  currentQuestion = availableQuestions[questionIndex]
  question.innterText = currentQuestion.question

  choices.forEach(choice => {
    const number = choice.dataset['number']
    choice.innterText = currentQuestion['choice' + number]
  })

  availableQuestions.splice(questionIndex, 1)

  acceptingAnswers = true;
}

choices.forEach(choice => {
  choices.addEventListener('click', e => {
    if(!acceptingAnswers) return

    acceptingAnswers = false
    const selectedChoice = e.target
    const selectedAnswer = selectedChoice.dataset['number']

    let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' :
    'incorrect'

    if(classToApply == 'correct') {
      incrementScore(score_points)
      selectedChoice.parentElement.classList.add(classToApply)

      setTimeout(() => {
        selectedChoice.parentElement.classList.remove(classToApply)
        getNewQuestion()

      }, 1000)
    }
  })
})

incrementScore = num => {
  score +=num
  scoreText.innerText = score
}

startQuiz()