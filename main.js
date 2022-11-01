let question;
let correctAnswer;
let wrongAnswers;
let score = 0;
let url = 'https://opentdb.com/api.php?amount=1&type=multiple&difficulty=easy&category=27'

//Selecting elements and adding event listeners
document.querySelector("#new-question").addEventListener('click', fetchQuestion);
const changeDif = document.querySelector('#difficulty');
const changeCat = document.querySelector('#category');
const radiobuttons = document.querySelectorAll(".radio-button");
const scoreElement = document.querySelector('#score');
const resultElement = document.querySelector('#result')
for (let i = 0; i < radiobuttons.length; i++) {
    radiobuttons[i].addEventListener('click', checkAnswer);
}
const dropdowns = document.querySelectorAll('.dropdown')
for (let i=0; i < dropdowns.length; i++) {
    dropdowns[i].addEventListener('change', changeURL);
}

function changeURL() {
    let newURL = ['https://opentdb.com/api.php?amount=1&type=multiple&','difficulty=easy','&category=27']
    newURL[1] = `difficulty=${changeDif.value}`
    newURL[2] = `&category=${changeCat.value}`
    url = newURL.toString().replaceAll(',', '') 
    fetchQuestion()
}

async function fetchQuestion() {
    resultElement.classList.remove("fade-in-out")
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
    scoreElement.textContent = `Your score: ${score}`
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
    scoreElement.textContent = `Your score: ${score}`;
    resultElement.textContent = 'Well done, correct answer!';
    resultElement.classList.toggle("fade-in-out");
}

function tooBad() {
    score-- ;
    scoreElement.textContent = `Your score: ${score}`;
    resultElement.textContent = 'Wrong answer, too bad :(';
    resultElement.classList.toggle("fade-in-out");

}

//HTML entities decoder
var decodeHTML = function (html) {
	var txt = document.createElement('textarea');
	txt.innerHTML = html;
	return txt.value;
};


