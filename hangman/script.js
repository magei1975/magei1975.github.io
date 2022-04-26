const words = [
  "Typ",
  "Banane",
  "Galgen",
  "Spaghetti",
  "Baum",
  "Wolf",
  "Boot",
  "Tier",
  "Unterricht",
  "Weltraum",
  "Tasche",
  "Schere",
  "Ball",
  "Taschenrechner",
  "Stift",
  "Strommast",
  "Straße",
  "Polizei",
  "Programm",
  "Mensch",
  "Papier",
  "Zahl",
  "Europa",
  "Zoo",
  "Land",
  "Meer",
  "Bahnhof",
  "Seil",
  "Tisch",
  "Möbel",
  "Stuhl",
  "Bauernhof",
  "Lautsprecher",
  "Tastatur",
  "Giraffe",
  "Krokodil",
  "Hund",
  "Katze",
  "Buchstabe",
  "Elefant",
  "Vogel",
  "Landwirt",
  "Mathematik",
  "Englisch",
  "Deutsch",
  "Maus",
  "Buch",
  "Karte",
  "Geld",
  "Kreditkarte",
  "Kabel",
  "Lampe",
  "Licht",
  "Bildschirm",
  "Post",
  "Paket",
  "Klebeband",
  "Schrank",
  "Gaschromatograph",
  "Degugehege",
  "Chornonne",
  "Ausschuss",
  "Ombudsmann",
  "Uhrzeit",
  "Datum",
  "Getränk",
  "Flasche",
  "Essen",
  "Fabelwesen",
  "Tüte",
  "Kanu",
  "Fernseher",
  "Steckdose",
  "Pflanze",
  "Tür",
  "Schulranzen",
  "Wand",
  "Pfote",
  "Brett",
  "Holz",
  "Rohr",
  "Heft",
  "Bank",
  "Zug",
  "Handy",
  "Topf",
  "Teller",
  "Gabel",
  "Messer",
  "Besteck",
  "Löffel",
  "Bild",
  "Fläche",
  "Internet",
  "Einstellungen",
  "Videospiel",
  "Band",
  "Kleidung",
  "Waschmaschine",
  "Kaffee",
  "Hose",
  "Rose",
  "Punkt",
  "Kreis",
  "Würfel",
  "Quadrat",
  "Hand",
  "Haare",
  "Frau",
  "Mann",
  "Knopf",
  "Fernbedienung",
  "Kreis",
  "Nachricht",
  "Boden",
  "Magie",
  "Feuer",
  "Wasser",
  "Drache",
  "Dinosaurier",
  "Schlange",
  "Tiger",
  "Huhn",
  "Igel",
  "Hase",
  "Kuh",
  "Schwein",
  "Kopf",
  "Gehirn",
  "Bein",
  "Körper",
  "Dusche",
  "Badewanne",
  "Echse",
  "Spinne",
  "Arbeit"
  
];


const buttonContainer = document.querySelector('.button-container');
const startGameButton = document.getElementById('start-game');
const svg = document.querySelector('svg');
const letterContainer = document.querySelector('.word');

setLetterButtonsDisabled(true);

buttonContainer.addEventListener('click', handleButton);
startGameButton.addEventListener('click', startGame);

let word;
let missedLetters = [];

function startGame() {
  hideGalgenParts();
  selectWord();
  setLetterButtonsDisabled(false);
}

function hideGalgenParts() {
  for (let i = 1; i < svg.children.length; i = i + 1) {
    svg.children[i].style.visibility = 'hidden';
  }
}

function prepareLetterDisplay(numberOfLetters) {
  while (letterContainer.children.length > numberOfLetters) {
    letterContainer.removeChild(letterContainer.lastElementChild);
  }
  
  while (letterContainer.children.length < numberOfLetters) {
    letterContainer.appendChild(letterContainer.lastElementChild.cloneNode(true));
  }
  
  for (let i = 0; i < numberOfLetters; i = i + 1) {
    letterContainer.children[i].textContent = '';
  }
}

function selectWord() {
  word = words[Math.floor(Math.random() * words.length)].toUpperCase();
  missedLetters = [];
  prepareLetterDisplay(word.length);
}

function setLetterButtonsDisabled(disabled) {
  for (let i = 0; i < buttonContainer.children.length; i = i + 1) {
    buttonContainer.children[i].disabled = disabled;
  }
}

function revealLetter(letter) {
  for (let i = 0; i < word.length; i = i + 1) {
    if (word[i] === letter) {
      letterContainer.children[i].textContent = letter;
    }    
  }
}

function showGalgenPart(index) {
  svg.children[index].style.visibility = 'visible';
}

function allLettersRevealed() {
  for (let i = 0; i < letterContainer.children.length; i = i + 1) {
    if (letterContainer.children[i].textContent === '') {
      return false;
    }
  }
  
  return true;
}

function allGalgenPartsShown() {
  return missedLetters.length === svg.children.length - 1;
}

function revealWord() {
  for (let i = 0; i < word.length; i = i + 1) {
    letterContainer.children[i].textContent = word[i];
  }
}

function showSuccessMessage() {
  setTimeout(() => {
    alert('Du hast gewonnen!');    
  }, 300);
}

function showFailedMessage() {
  setTimeout(() => {
    alert('Du hast verloren.');
  }, 300);
}

function guessLetter(letter) {
  if (word.includes(letter)) {
    revealLetter(letter);
    
    if (allLettersRevealed()) {
      showSuccessMessage();
      setLetterButtonsDisabled(true);
    }
    
  } else {
    missedLetters.push(letter);
    showGalgenPart(missedLetters.length);
    
    if (allGalgenPartsShown()) {
      revealWord();
      setLetterButtonsDisabled(true);
      showFailedMessage();
    }
  }
}

function handleButton(event) {
  const button = event.target;
  
  if (button.nodeName !== 'BUTTON') {
    return;
  }
  
  const letter = button.textContent;
  
  guessLetter(letter);
  
  button.disabled = true;
}
