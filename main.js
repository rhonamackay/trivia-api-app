let question;
let correctAnswer;
let wrongAnswers;
let score = 0;
let url = 'https://opentdb.com/api.php?amount=1&category=9&type=multiple'

//Selecting elements and adding event listeners
document.querySelector("#new-question").addEventListener('click', fetchQuestion);
const radiobuttons = document.querySelectorAll(".radio-button");
for (i = 0; i < radiobuttons.length; i++) {
    radiobuttons[i].addEventListener('click', checkAnswer);
}
document.querySelector('#difficulty').addEventListener('change', changeDiff);
document.querySelector('#category').addEventListener('change', changeCat);

function changeCat(event) {
    url = url.slice(0,46) + event.target.value + url.slice(47,62)
    console.log(url)
}

function changeDiff(event) {
    url = url + `&difficulty=${event.target.value}`
}

async function fetchQuestion() {
    let buttons = document.querySelectorAll(".radio-button")
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].checked = false;
        }
    console.log(url)
    let response = await fetch(url);
    let data = await response.json();
    renderQuestion(data)
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
}

fetchQuestion();

function checkAnswer(event) {
    if (event.target.nextSibling.textContent === correctAnswer) {
        wellDone();
    } else {
        tooBad();
    }
}

function wellDone() {
    score++ ;
    alert(`Well done, you chose the correct answer!\nYour score is ${score}`);
}

function tooBad() {
    score-- ;
    alert(`Too bad, better luck next time\nYour score is ${score}`);
}

//HTML entities decoder
var decodeHTML = function (html) {
	var txt = document.createElement('textarea');
	txt.innerHTML = html;
	return txt.value;
};


