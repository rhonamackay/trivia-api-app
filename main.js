let question;
let correctAnswer;
let wrongAnswers;
let score = 0;
let sessionToken = '';
let url = ''
let gotItRight = false;


fetchToken()

//Selecting elements and adding event listeners
document.querySelector("#check-answer").addEventListener('click', checkAnswer);
const changeDif = document.querySelector('#difficulty');
const changeCat = document.querySelector('#category');
const radiobuttons = document.querySelectorAll(".radio-button");
const scoreElement = document.querySelector('#score');
const resultElement = document.querySelector('#result')
for (let i = 0; i < radiobuttons.length; i++) {
    radiobuttons[i].addEventListener('click', collectAnswer);
}
const dropdowns = document.querySelectorAll('.dropdown')
for (let i=0; i < dropdowns.length; i++) {
    dropdowns[i].addEventListener('change', changeURL);
}

async function fetchToken() {
    let response = await fetch('https://opentdb.com/api_token.php?command=request');
    let tokenData = await response.json();
    console.log(tokenData)
    sessionToken = tokenData.token
    url='https://opentdb.com/api.php?amount=1&type=multiple&difficulty=easy&category=27&token=' + sessionToken
    fetchQuestion();
}

function changeURL() {
    let newURL = ['https://opentdb.com/api.php?amount=1&type=multiple&','difficulty=easy','&category=27', '&token=', sessionToken]
    newURL[1] = `difficulty=${changeDif.value}`
    newURL[2] = `&category=${changeCat.value}`
    url = newURL.toString().replaceAll(',', '') 
    fetchQuestion()
}

async function fetchQuestion() {
    console.log(url)
    gotItRight = false
    resultElement.classList.remove("fade-in-out")
    let buttons = document.querySelectorAll(".radio-button")
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].checked = false;
        }
    let response = await fetch(url);
    let data = await response.json();
    if (data.response_code === 4) {
        alert('You have recieved all possible questions! Either chose a different difficulty and/or topic, or reload to reset your session')
    } else { 
        renderQuestion(data)
    }
}

async function renderQuestion(data) {
    //Retrieve info from data and display it on the DOM
    question = decodeHTML(data.results[0].question);
    correctAnswer = decodeHTML(data.results[0].correct_answer);
    wrongAnswers = data.results[0].incorrect_answers;
    let wrongAnswer1 = decodeHTML(wrongAnswers[0]);
    let wrongAnswer2 = decodeHTML(wrongAnswers[1]);
    let wrongAnswer3 = decodeHTML(wrongAnswers[2]);
    let answers = [correctAnswer, wrongAnswer1, wrongAnswer2, wrongAnswer3];
    answers = answers.sort(() => Math.random() - 0.5);
    document.querySelector("#question").innerText = question;
    document.querySelector("#label-0").textContent = answers[0];
    document.querySelector("#label-1").textContent = answers[1];
    document.querySelector("#label-2").textContent = answers[2];
    document.querySelector("#label-3").textContent = answers[3];
    scoreElement.textContent = `Your score: ${score}`;
}

function collectAnswer(event) {
    if (event.target.nextSibling.textContent === correctAnswer) {
        gotItRight = true;
    } else {
        gotItRight = false;
    }
}

function checkAnswer() {
    if (resultElement.classList.contains("fade-in-out") === true) {
        resultElement.classList.remove("fade-in-out");
    }
    if (gotItRight === true) {
        wellDone();
        gotItRight = false;
    } else {
        tooBad();
    }
}

async function wellDone() {
    score++ ;
    scoreElement.textContent = `Your score: ${score}`;
    resultElement.textContent = 'Well done, correct answer! 🎉';
    resultElement.classList.toggle("fade-in-out");
    await new Promise(resolve => setTimeout(resolve, 1000));
    fetchQuestion();
}

function tooBad() {
    resultElement.textContent = 'Wrong answer 😔';
    resultElement.classList.toggle("fade-in-out");
}

//HTML entities decoder
var decodeHTML = function (html) {
	var txt = document.createElement('textarea');
	txt.innerHTML = html;
	return txt.value;
};


