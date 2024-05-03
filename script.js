const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [
  {
    question: 'Which animal is known as the "Ship of the Desert"?',
    answers: [
      { text: 'Camel', correct: true },
      { text: 'Dog', correct: false },
      { text: 'Cat', correct: false },
      { text: 'Lion', correct: false }
    ]
  },
  {
    question: 'How many days are there in a week?',
    answers: [
      { text: '15 Days', correct: false },
      { text: '165 Days', correct: false },
      { text: '7 Days', correct: true },
      { text: '30 Days', correct: false }
    ]
  },
  {
    question: 'How many hours are there in a day?',
    answers: [
      { text: '30 hours', correct: false },
      { text: '24 hours', correct: true },
      { text: '20 hours', correct: false },
      { text: '12 hours', correct: false }
    ]
  },
  {
    question: 'Rainbow consist of how many colours?',
    answers: [
      { text: '12 colours', correct: false },
      { text: '5 colours', correct: false },
      { text: '10 colours', correct: false },
      { text: '7 colours', correct: true }
    ]
  },
  {
    question: 'Name the National bird of India?',
    answers: [
      { text: 'Peacock', correct: true },
      { text: 'Crow', correct: false },
      { text: 'Parrot', correct: false },
      { text: 'Sparrow', correct: false }
    ]
  },
  {
    question: 'How many sides are there in a triangle?',
    answers: [
      { text: 'One', correct: false },
      { text: 'Two', correct: false },
      { text: 'Three', correct: true },
      { text: 'Four', correct: false }
    ]
  }
]