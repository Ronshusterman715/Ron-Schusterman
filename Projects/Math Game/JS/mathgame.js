'use strict'
let currentScore = 0;
let randomNumber1;
let randomNumber2;
let operator;
let correctAnswer;
let isNewGame = false;

let add = (numb1, numb2) => numb1 + numb2;
let subtract = (numb1, numb2) => numb1 - numb2;
let multiply = (numb1, numb2) => numb1 * numb2;
let divide = (numb1, numb2) => Math.round(numb1 / numb2 * 100) / 100;


function createExercise() {
    let numberRange = document.getElementById('numberRange').value;
    operator = document.getElementById('operators').value;
    randomNumber1 = Math.ceil(Math.random() * numberRange);
    randomNumber2 = Math.ceil(Math.random() * numberRange);
    document.getElementById("randomNum1").innerHTML = randomNumber1;
    document.getElementById("randomNum2").innerHTML = randomNumber2;
    document.getElementById("operator").innerHTML = operator;
}


function checkAnswer() {
    let userAnswer = document.getElementById('answer').value;
    if (isNewGame == false && userAnswer == "") {
        alert("הכנס בבקשה תשובה תקינה");
        return;
    }

    if (operator === "+") correctAnswer = calculateAnswer(randomNumber1, randomNumber2, add);
    if (operator === "-") correctAnswer = calculateAnswer(randomNumber1, randomNumber2, subtract);
    if (operator === "*") correctAnswer = calculateAnswer(randomNumber1, randomNumber2, multiply);
    if (operator === "/") correctAnswer = calculateAnswer(randomNumber1, randomNumber2, divide);

    if (isNewGame == false) {
        let points = userAnswer == correctAnswer ? 10 : 0;
        currentScore += points;
        console.log(currentScore);

        let exercise = `${randomNumber1} ${operator} ${randomNumber2}`
        updateTable(exercise, userAnswer, correctAnswer);
    }

    document.getElementById("answer").value = "";
}

function calculateAnswer(numb1, numb2, calcFunc) {
    return calcFunc(numb1, numb2);
}


function updateTable(exercise, userAnswer, correctAnswer) {
    document.getElementById("tableContent").innerHTML += `<tr>
    <td>${currentScore}</td>
    <td>${userAnswer}</td>
    <td>${correctAnswer}</td>
    <td>${exercise}</td>
    </tr>`
    createExercise();
}

function newGame() {
    currentScore = 0;
    document.getElementById("tableContent").innerHTML = "";
    document.getElementById("answer").value = "";
    isNewGame = true;
    createExercise();
    isNewGame = false;
}





