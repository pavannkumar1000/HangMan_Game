const HANGMANPICS = [
`  +---+
  |   |
      |
      |
      |
      |
=========`, 
`  +---+
  |   |
  O   |
      |
      |
      |
=========`, 
`  +---+
  |   |
  O   |
  |   |
      |
      |
=========`, 
`  +---+
  |   |
  O   |
 /|   |
      |
      |
=========`, 
`  +---+
  |   |
  O   |
 /|\\  |
      |
      |
=========`, 
`  +---+
  |   |
  O   |
 /|\\  |
 /    |
      |
=========`, 
`  +---+
  |   |
  O   |
 /|\\  |
 / \\  |
      |
=========`];

// Random Ben 10 words and hints
const words = [
  { word: "OMNITRIX", hint: "Ben's powerful alien device" },
  { word: "FOURARMS", hint: "Red strong alien with 4 arms" },
  { word: "HEATBLAST", hint: "Fire alien" },
  { word: "XLR8", hint: "Fast blue alien" },
  { word: "CANNONBOLT", hint: "Ball-shaped armored alien" },
  { word: "DIAMONDHEAD", hint: "Crystal body alien" },
  { word: "ALIENFORCE", hint: "Team of aliens in series" },
  { word: "GHOSTFREAK", hint: "Ghostly alien" },
  { word: "WILDMUTT", hint: "Orange alien with beast-like senses" },
  { word: "UPGRADE", hint: "Tech-merging alien" },
  { word: "GREYMATTER", hint: "Small genius alien" },
  { word: "RIPJAWS", hint: "Underwater fish alien" },
  { word: "STINKFLY", hint: "Insect alien with slime attacks" },
  { word: "EYEGAUY", hint: "Alien with powerful laser eye" },
  { word: "CHROMASTONE", hint: "Alien with crystal energy powers" },
  { word: "SWAMPFIRE", hint: "Plant-based alien with fire powers" },
  { word: "VILGAX", hint: "Ben's arch enemy" },
  { word: "KEVIN", hint: "Ben’s rival who absorbs powers" },
  { word: "GWEN", hint: "Ben’s cousin with magic powers" },
  { word: "TENNYSON", hint: "Ben's family surname" },
  { word: "WAYBIG", hint: "Giant alien with cosmic powers" },
  { word: "BIGCHILL", hint: "Moth-like alien with ice powers" },
  { word: "ECHOECHO", hint: "Alien that duplicates with sound" },
  { word: "JETRAY", hint: "Flying alien with laser beams" },
  { word: "HUMUNGOSAUR", hint: "Dinosaur-like alien with strength" },
  { word: "ULTIMATRIX", hint: "Upgraded alien device after Omnitrix" },
  { word: "BENWOLF", hint: "Werewolf-like alien" },
  { word: "OMNIVERSE", hint: "Later Ben 10 series" },
  { word: "CLOCKWORK", hint: "Alien that controls time" },
  { word: "SHOCKSQUATCH", hint: "Yeti-like alien with electricity powers" }
];

let selectedWord = "";
let displayedWord = [];
let wrongGuesses = 0;
const maxWrong = 6;

// DOM elements
const wordDisplay = document.getElementById("wordDisplay");
const lettersContainer = document.getElementById("lettersContainer");
const wrongCount = document.getElementById("wrongCount");
const message = document.getElementById("message");
const hintText = document.getElementById("hintText");
const hangmanDisplay = document.getElementById("hangmanDisplay");
const alienImg = document.getElementById("alienImg");
const restartBtn = document.getElementById("restartBtn");

function startGame() {
  const index = Math.floor(Math.random() * words.length);
  selectedWord = words[index].word;
  displayedWord = Array(selectedWord.length).fill("_");
  wrongGuesses = 0;

  wordDisplay.textContent = displayedWord.join(" ");
  wrongCount.textContent = wrongGuesses;
  message.textContent = "";
  hintText.textContent = words[index].hint;

  hangmanDisplay.textContent = HANGMANPICS[wrongGuesses];
  alienImg.src = "ghost_freak.png";

  createLetterButtons();
}

function createLetterButtons() {
  lettersContainer.innerHTML = "";
  for (let i = 65; i <= 90; i++) {
    const btn = document.createElement("button");
    btn.textContent = String.fromCharCode(i);
    btn.addEventListener("click", guessLetter);
    lettersContainer.appendChild(btn);  }
}


function guessLetter(e) {
  const letter = e.target.textContent;
  e.target.disabled = true;

  if (selectedWord.includes(letter)) {
    for (let i = 0; i < selectedWord.length; i++) {
      if (selectedWord[i] === letter) displayedWord[i] = letter;
    }
    wordDisplay.textContent = displayedWord.join(" ");
  } else {
    wrongGuesses++;
    wrongCount.textContent = wrongGuesses;
    hangmanDisplay.textContent = HANGMANPICS[wrongGuesses];
    alienImg.classList.add("animate");
    setTimeout(() => alienImg.classList.remove("animate"), 300);
  }

  checkGameStatus();
}

function checkGameStatus() {
  if (!displayedWord.includes("_")) {
    message.textContent = "🎉 You Win!";
    disableAllButtons();
  } else if (wrongGuesses >= maxWrong) {
    message.textContent = `💀 You Lose! Word was: ${selectedWord}`;
    disableAllButtons();
  }
}

function disableAllButtons() {
  const buttons = document.querySelectorAll("#lettersContainer button");
  buttons.forEach(btn => btn.disabled = true);
}

restartBtn.addEventListener("click", startGame);

startGame();
