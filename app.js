const words = ["programare", "javascript", "dezvoltare", "spanzuratoarea", "computers"];
let selectedWord = "";
let guessedWord = [];
let wrongLetters = [];
let remainingTries = 6;
const wordDisplay = document.getElementById("word-display");
const wrongLettersDisplay = document.getElementById("wrong-letters");
const remainingTriesDisplay = document.getElementById("remaining-tries");
const letterInput = document.getElementById("letter-input");
const guessBtn = document.getElementById("guess-btn");
const resetBtn = document.getElementById("reset-btn");
function initializeGame() {
    selectedWord = words[Math.floor(Math.random() * words.length)].toUpperCase();
    guessedWord = Array(selectedWord.length).fill('_');
    wrongLetters = [];
    remainingTries = 6;
    updateDisplay();
}
function updateDisplay() {
    wordDisplay.textContent = guessedWord.join(' ');
    wrongLettersDisplay.textContent = wrongLetters.join(', ');
    remainingTriesDisplay.textContent = remainingTries;
    if (guessedWord.join('') === selectedWord) {
        alert('Felicitari! Ai castigat!');
        initializeGame();
    } else if (remainingTries === 0) {
        alert(`Ai pierdut! Cuvantul era: "${selectedWord}"`);
        initializeGame();
    }
}
function guessLetter() {
    const letter = letterInput.value.toUpperCase();

    if (!letter.match(/[A-Z]/)) {
        alert('Introdu o litera valida.');
        return;
    }
    if (guessedWord.includes(letter) || wrongLetters.includes(letter)) {
        alert('Ai introdus deja aceasta litera.');
        return;
    }
    if (selectedWord.includes(letter)) {
        for (let i = 0; i < selectedWord.length; i++) {
            if (selectedWord[i] === letter) {
                guessedWord[i] = letter;
            }
        }
    } else {
        wrongLetters.push(letter);
        remainingTries--;
    }
    updateDisplay();
}
function resetGame() {
    letterInput.value = "";
    initializeGame();
}
initializeGame();
guessBtn.addEventListener('click', guessLetter);
resetBtn.addEventListener('click', resetGame);
letterInput.addEventListener('keypress', function(event) {
    if (event.key === "Enter") {
        guessLetter();
    }
});