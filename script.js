let wordToGuess = "indisponibil".split("");
const wordElement = document.getElementById("word");
const wrongLetterElement = document.getElementById("wrong-letters");
const figureParts = document.querySelectorAll(".figure-part");
const notificationElement = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');
const playAgainBtn = document.getElementById('play-button');

const correctLetters = [];
const wrongLetters = [];

function displayWord() {
    wordElement.innerHTML = "";
    wordElement.classList.add("add-margin");
    wordToGuess.map(function (letter) {
        if (correctLetters.includes(letter)) {
            wordElement.classList.remove("add-margin");
            wordElement.innerHTML += "<span class='letter'>" + letter + "</span>"
        } else {
            wordElement.innerHTML += "<span class='letter'>" + "" + "</span>"
        }
    });
    let wordToGuessString = wordToGuess.join("");
    const innerWord = wordElement.innerText.replace(/\n/g, '');
    if (innerWord === wordToGuessString) {
        finalMessage.classList.remove("unsuccess");
        finalMessage.classList.add("success");
        finalMessage.innerText = 'Congratulations! You won! 😃';
        popup.style.display = 'flex';
    }
}

function updateWrongLetterContainer() {
    wrongLetterElement.innerHTML = "";
    if (wrongLetters.length > 0) {
        wrongLetterElement.innerHTML += "<p class='wrong-letters-title'>Wrong:</p>"
    }
    wrongLetters.map(function (letter) {
        wrongLetterElement.innerHTML += "<span>" + letter + ", </span>"
    })
    figureParts.forEach((part, index) => {
        const errors = wrongLetters.length;
        if (index < errors) {
            part.style.display = 'block'
        } else {
            part.style.display = 'none';
        }
    });
    if (wrongLetters.length === figureParts.length) {
        finalMessage.classList.remove("success");
        finalMessage.classList.add("unsuccess");
        finalMessage.innerText = 'Unfortunately you lost. 😕';
        popup.style.display = 'flex';
    }
}

function showNotification() {
    notificationElement.classList.add('show');
    setTimeout(() => {
        notificationElement.classList.remove('show');
    }, 2000);
}

window.addEventListener('keydown', e => {
    if (e.keyCode >= 65 && e.keyCode <= 90) {
        const letter = e.key;
        if (wordToGuess.includes(letter)) {
            if (!correctLetters.includes(letter)) {
                correctLetters.push(letter);
                displayWord();
            } else {
                showNotification();
            }
        } else {
            if (!wrongLetters.includes(letter)) {
                wrongLetters.push(letter);
                updateWrongLetterContainer();
            } else {
                showNotification();
            }
        }
    }
});

playAgainBtn.addEventListener('click', function () {
    correctLetters.splice(0);
    wrongLetters.splice(0);
    displayWord();
    updateWrongLetterContainer();
})
displayWord();