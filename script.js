function setAnswer(word) {
  var answerElement = document.getElementById("answer");
  var letters = answerElement.children;
  for(i=0;i<word.length;i++) {
    letters[i].textContent = word[i];
  }
}

function setGuess(word) {
  var guessElement = document.getElementById("guess");
  var letters = guessElement.children;
  for(i=0;i<word.length;i++) {
    letters[i].textContent = word[i];
  }
}

function cycleColor(letterButton) {
  classList = letterButton.classList
  color = classList[classList.length-1]
  switch(color) {
    case "none":
      classList.remove("none");
      classList.add("yellow");
      color = "yellow";
      break;
    case "yellow":
      classList.remove("yellow");
      classList.add("green");
      color = "green";
      break;
    case "green":
      classList.remove("green");
      classList.add("none");
      color = "none";
      break;
  }
}

function clearColor() {
  var guessElement = document.getElementById("guess");
  var letters = guessElement.children;
  for(i=0;i<letters.length;i++) {
    if (letters[i].classList.contains("green")) {
      letters[i].classList.replace("green","none");
    }
    else if (letters[i].classList.contains("yellow")) {
      letters[i].classList.replace("yellow","none");
    }
  }
}

//begin wobbery
const letterPos = c => c.charCodeAt(0) - 'a'.charCodeAt(0)

function determineResult(answerWord, guessWord) {
  var result = [];
  var chars = new Array(26).fill(0);

  // First pass - Identify green colour and letter counts for yellow colour
  for(i=0;i<answerWord.length;i++) {
    realChar = answerWord[i];
    guessChar = guessWord[i];

    chars[letterPos(realChar)] += 1;

    if (realChar == guessChar) {
      result.push('green');
      chars[letterPos(guessChar)] -= 1;
    }
    else {
      result.push('none')
    }
  }

  for (i=0;i<guessWord.length;i++) {
    guessChar = guessWord[i];
    if ((chars[letterPos(guessChar)] > 0) && (result[i] != 'green')) {
      result[i] = 'yellow';
      chars[letterPos(guessChar)] -= 1;
    }
  }

  return result;
}
//end wobbery

function collectInput() {
  var guessElement = document.getElementById("guess");
  var letters = guessElement.children;
  var out = [];
  for(i=0;i<letters.length;i++) {
    out.push(letters[i].classList[letters[i].classList.length-1]);
  }
  return out;
}

function checkGuess() {
  var guessedColors = collectInput()
  var correctColors = determineResult(answer,guess)
  console.log(guessedColors);
  console.log(correctColors);
  alert(arrayEquals(guessedColors, correctColors));
  return arrayEquals(guessedColors, correctColors);
}

function updateTime() {

}

var answer = "aaaaa"
var guess = "aaaaa"

function newGame() {

  unused = weightedRandom({0:0.05, 1:0.25, 2:0.30, 3:0.25, 4:0.10, 5:0.05})

  do {
    answer = answers[Math.floor(Math.random()*answers.length)];
    guess = answers[Math.floor(Math.random()*answers.length)];
  } while (arrayCount(determineResult(answer,guess), "none") != unused)

  setAnswer(answer);
  setGuess(guess);

  clearColor();

  console.log(answer,guess,unused);
  console.log(arrayCount(determineResult(answer,guess), "none") == unused);
}
document.getElementById("check").addEventListener("click", checkGuess);
document.getElementById("newGame").addEventListener("click", newGame);

newGame();