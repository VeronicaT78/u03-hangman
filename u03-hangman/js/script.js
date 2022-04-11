// Globala variabler

const wordList = ['lappland', 'norrbotten', 'västerbotten', 'jämtland', 'ångermanland', 
'härjedalen', 'medelpad', 'hälsingland', 'gästrikland', 'dalarna', 'värmland', 
'uppland', 'västmanland', 'södermanland', 'närke', 'dalsland', 'bohuslän', 'västergötland', 
'östergötland', 'småland', 'gotland', 'öland', 'halland', 'blekinge', 'skåne'];    
// Array: med spelets alla ord

const imgList = ['images/h0.png', 'images/h1.png', 'images/h2.png', 'images/h3.png',
'images/h4.png', 'images/h5.png', 'images/h6.png'];


let selectedWord;    // Sträng: ett av orden valt av en slumpgenerator från arrayen ovan
let guesses = 0;     // Number: håller antalet gissningar som gjorts
let guessesLeft = 6;
let hangmanImg;


let startGameBtnEl = document.querySelector('#startGameBtn');  // DOM-nod: knappen som du startar spelet med
let letterButtonEls = document.querySelectorAll('#letterButtons button'); // Array av DOM-noder: Knapparna för bokstäverna
let letterButtonContainerEl = document.querySelector('ul#letterButtons');
let letterBoxEls = document.querySelectorAll('#letterBoxes ul li');    // Array av DOM-noder: Rutorna där bokstäverna ska stå
let letterBoxContainerEl = document.querySelector('#letterBoxes ul');
let msgHolderEl= document.querySelector('#message');     // DOM-nod: Ger meddelande när spelet är över
let hangmanImgEl = document.querySelector('#hangman');

// Funktion som startar spelet vid knapptryckning, och då tillkallas andra funktioner
//object.addEventListener("click", myScript);

startGameBtnEl.addEventListener("click", startGame);

// Funktion som slumpar fram ett ord

function wordSelect(){
    const randomNumber = Math.floor(Math.random() * wordList.length);
    return wordList[randomNumber];   
}

// Funktion som tar fram bokstävernas rutor, antal rutor beror på vilket ord slumptas fram
function emptyLetterBox(){
    letterBoxContainerEl.innerHTML = "";
}

function makeLetterBox(amount){
        //amount är antalet bokstäver i selectedWord
        for (let i = 0; i < amount; i++) {
        let newLI = document.createElement('li');
        newLI.innerHTML = '<input type="text" disabled value="&nbsp;"/>';
        letterBoxContainerEl.appendChild(newLI);
        }

    letterBoxEls = document.querySelectorAll('#letterBoxes ul li');
}
//Funktion som kollar gamestate

function checkGameState(lastGuessCorrect){
    if (hangmanImgEl.src.slice(-6) === 'h6.png' && !lastGuessCorrect){
        gameLost(); //kollar om rutorna är ifyllda count = 0 if guess correct varenda gång count = 0++ lika med längden av selectedword
    }
    if (lastGuessCorrect && (selectedWord.length === chosenLetterCount)) {
        gameWin(); //när felgissningar är över 6 
    }
}

// Funktion som fyller i rätt bokstav i valt ord på rätt plats

function chooseLetter(e){
    
    let lastGuessCorrect;
    let chosenLetter = e.target.value;

    e.target.disabled = true;
    
    let startIndex = 0, index;
    var searchStrLen = chosenLetter.length;
    if (selectedWord.indexOf(chosenLetter, startIndex) <0) {
        lastGuessCorrect=false;
        guesses = guesses + 1;
        drawHangman(guesses)
        checkGameState(lastGuessCorrect);
        return;
    }
    while((index = selectedWord.indexOf(chosenLetter, startIndex)) > -1){
        lastGuessCorrect=true;
        letterBoxEls[index].firstElementChild.value = chosenLetter;
        chosenLetterCount++;
        checkGameState(lastGuessCorrect);
        startIndex = index + searchStrLen;
    }
    return;
}

// Funktion som aktiverar och inaktiverar bokstavstangenterna på skärmen

function activateLB(){
   for (let i = 0; i < letterButtonEls.length; i++) {
        letterButtonEls[i].disabled = false
    }
}

function deactivateLB(){
    for (let i = 0; i < letterButtonEls.length; i++) {
        letterButtonEls[i].disabled = true
    }
}

// Funktion som visar delarna av hangman när användaren gissat fel

function drawHangman(index){
    hangmanImg = imgList[index];
    hangmanImgEl.setAttribute("src", hangmanImg);
}


// Funktion som ger användaren meddelande om vinst i meddelanderutan

function gameWin(){
    informUser('Du vann!');
    deactivateLB();
}
// Funktion som ger användaren meddelande om förlust i meddelanderutan

function gameLost(){
    informUser('Du förlorade!');
    deactivateLB();
}

//Funktion som meddelar användaren i message rutan
function informUser(message){
    msgHolderEl.innerText = message;
}

emptyLetterBox();
deactivateLB();

function startGame(){
     guesses = 0;
     chosenLetterCount = 0;
     selectedWord = wordSelect(wordList).toUpperCase();
     let wordLength = selectedWord.length
     activateLB();
     emptyLetterBox();
     makeLetterBox(wordLength);
     drawHangman(0);
     informUser("");
}

letterButtonEls.forEach(button => button.addEventListener("click", chooseLetter));

let acc = document.getElementsByClassName("accordion");
let i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.display === "block") {
      panel.style.display = "none";
    } else {
      panel.style.display = "block";
    }
  });
}