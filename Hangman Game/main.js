// Letters
const letter = "abcdefghijklmnopqrstuvwxyz";
let lettersArray = Array.from(letter);
//Select Letters Container
let lettersContainer = document.querySelector(".letters");
lettersArray.forEach((letter) => {
  let span = document.createElement("span");
  let spanText = document.createTextNode(letter);
  span.appendChild(spanText);
  span.className = "letter-box";
  lettersContainer.appendChild(span);
});
// Opject Of Words & Category
const word = {
  programming: ["php", "javascript", "go", "scala", "fortran", "r", "mysql", "python"],
  movies: ["Prestige", "Inception", "Parasite", "Interstellar", "Whiplash", "Memento", "Coco", "Up"],
  people: ["Alpert Einstein", "Hitchcock", "Alexander", "Cleopatra", "Mahatma Ghandi"],
  countries: ["Syria", "Palestine", "Yemen", "Egypt", "Bahrain", "Qatar"],
};
//Get Random Property
let allKeys = Object.keys(word);
let randomPropNumper = Math.floor(Math.random() * allKeys.length);
let randomPropName = allKeys[randomPropNumper];
let randomPropValue = word[randomPropName];
let randomValueNumper = Math.floor(Math.random() * randomPropValue.length);
let randomValueName = randomPropValue[randomValueNumper];
//Set Category Info
document.querySelector(".game-info .category span").innerHTML = randomPropName;

//Select Letters Guess Elements
let letterGuessContainer = document.querySelector(".letter-guess");
let lettersAndSpace = Array.from(randomValueName);
lettersAndSpace.forEach((letter) => {
  let emptySpan = document.createElement("span");
  if (letter === " ") {
    emptySpan.className = "has-space";
  }
  letterGuessContainer.appendChild(emptySpan);
});
//Select Guss Span
let guessSpan = document.querySelectorAll(".letter-guess span");
//Set Wrong Attempts
let wrongAttempts = 0;
let successRate = 0;
//Select The Drow Element
let TheDrow = document.querySelector(".hangman-drow");
//Handle Clecking On Letters
document.addEventListener("click", (e) => {
  //Set Choose Status
  let theStatus = false;
  if (e.target.className === "letter-box") {
    e.target.classList.add("clicked");
    //Git Clicked Letter
    let clickedLetter = e.target.innerHTML.toLowerCase();
    // Loop On The Chosen Word
    let chosenWord = Array.from(randomValueName.toLowerCase());
    chosenWord.forEach((wordLetter, wordIndex) => {
      if (clickedLetter == wordLetter) {
        //Set Status To Correct
        theStatus = true;
        guessSpan.forEach((span, spanIndex) => {
          if (wordIndex == spanIndex) {
            span.innerHTML = clickedLetter;
            successRate++;
          }
        });
      }
    });
    //Outside Loop
    //If letter Is Wrong
    if (theStatus !== true) {
      //Increase Wrong Attempt
      wrongAttempts++;
      //Add Class wrong To The Drow Element
      TheDrow.classList.add(`wrong-${wrongAttempts}`);
      //Play Fail Sound
      document.getElementById("fail").play();
      if (wrongAttempts === 8) {
        gameOver();
        lettersContainer.classList.add("finished");
      }
    } else {
      document.getElementById("success").play();

      if (successRate === randomValueName.length) {
        succeed();
        lettersContainer.classList.add("finished");
        // console.log("success");
      }
    }
    // console.log(guessSpan.innerHTML);
  }
});
//Function
function gameOver() {
  let div = document.createElement("div");
  let divText = document.createTextNode(`Game Over--The Word Is ${randomValueName}`);
  div.appendChild(divText);
  div.className = "popup";
  document.body.appendChild(div);
}
function succeed() {
  let div = document.createElement("div");
  let divText = document.createTextNode(`Bravo your Wrong Rate Is ${wrongAttempts}`);
  div.appendChild(divText);
  div.className = "popup";
  document.body.appendChild(div);
}
