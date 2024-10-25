// DOM-elements
const wordGrid = document.getElementById("wordGrid"); // Word grid for the game
const keyboard = document.getElementById("keyboard"); // Keyboard for the game

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"; // Alphabet used in the game

//***DICTIONARIES***


// words in english

// HOX! TÄN SISÄLTÖ TÄYTYY OLLA ISOLLA JOTTA TOIMII
const dictionary = [
    "ALGORITHM",
    "APPLICATION",
    "ASYNCHRONOUS",
    "BANDWIDTH",
    "DATABASE",
    "DEBUGGING",
    "ENCRYPTION",
    "FRAMEWORK",
    "FUNCTION",
    "LIBRARY",
    "MARKUP",
    "NETWORK",
    "PROTOCOL",
    "REPOSITORY",
    "SERVER",
    "SOFTWARE",
    "STYLESHEET",
    "VARIABLE",
    "VIRTUALIZATION",
    "PROGRAMMING",
    // 4-letter ICT words
    "DATA",
    "CODE",
    "BYTE",
    "LINK",
    // 5-letter ICT words
    "CACHE",
    "ARRAY",
    "INPUT",
    "LOGIN",
    // 6-letter ICT words
    "DOMAIN",
    "CLIENT",
    "SCRIPT",
    "MEMORY"
];

// translations in finnish

const translations = {
    "algorithm": "algoritmi",
    "application": "sovellus",
    "asynchronous": "asynkroninen",
    "bandwidth": "kaistanleveys",
    "database": "tietokanta",
    "debugging": "virheenkorjaus",
    "encryption": "salaus",
    "framework": "kehys",
    "function": "funktio",
    "library": "kirjasto",
    "markup": "merkkauskieli",
    "network": "verkko",
    "protocol": "protokolla",
    "repository": "varasto",
    "server": "palvelin",
    "software": "ohjelmisto",
    "stylesheet": "tyylitiedosto",
    "variable": "muuttuja",
    "virtualization": "virtualisointi",
    "programming": "ohjelmointi",
    // Translations for new words
    "data": "data",
    "code": "koodi",
    "byte": "tavu",
    "link": "linkki",
    "cache": "välimuisti",
    "array": "taulukko",
    "input": "syöte",
    "login": "kirjautuminen",
    "domain": "verkkotunnus",
    "client": "asiakas",
    "script": "käsikirjoitus",
    "memory": "muisti"
};


// ***HAMBURGER-MENU***

const hamburger = document.querySelector(".hamburger");
hamburger.addEventListener('click', function(){
    this.classList.toggle("close");
    
})


// ***THEME***

// To set theme on page load based on localStorage
document.addEventListener("DOMContentLoaded", function() {
  const themeSelector = document.getElementById('theme-selector');
  const savedTheme = localStorage.getItem('theme');

  if (savedTheme) {
    document.body.className = savedTheme; // Apply the saved theme class
    themeSelector.value = savedTheme; // Set the selector to match the saved theme
  }

  // Change theme when user selects a new one
  themeSelector.addEventListener('change', function() {
    const selectedTheme = themeSelector.value;
    document.body.className = selectedTheme; // Apply the theme class
    localStorage.setItem('theme', selectedTheme); // Save the selected theme to localStorage
  });
});


// ***TOPICS SELECT***

// *** DICTIONARY FILTERING BASED ON SELECTION ***
const allLetterWords = dictionary; // Use the full dictionary
const fourLetterWords = dictionary.filter(word => word.length === 4);
const fiveLetterWords = dictionary.filter(word => word.length === 5);
const sixLetterWords = dictionary.filter(word => word.length === 6);

// Add event listeners for the menu items
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('allWords').addEventListener('click', () => {
        updateDictionary(allLetterWords);
    });
    document.getElementById('4letterWords').addEventListener('click', () => {
        updateDictionary(fourLetterWords);
    });
    document.getElementById('5letterWords').addEventListener('click', () => {
        updateDictionary(fiveLetterWords);
    });
    document.getElementById('6letterWords').addEventListener('click', () => {
        updateDictionary(sixLetterWords);
    });

    // Initialize the game on page load with full dictionary by default
    window.onload = () => newGame(allLetterWords);
});

// Function to update the game with the new word set
function updateDictionary(filteredWords) {
    currentWord = filteredWords[Math.floor(Math.random() * filteredWords.length)];
    newGame(filteredWords); // Start a new game with the chosen topic
}

// Start new game function, using full dictionary by default (all words)
const newGame = (filteredWords = allLetterWords) => {
    currentWord = filteredWords[Math.floor(Math.random() * filteredWords.length)];
    wordGrid.innerHTML = ""; // Clear previous grid
    currentGuess = "";
    currentLetterIndex = 0;
    currentRow = 0;
    createRows();
    createKeyboard();
};




// Create one row for the word grid
function createRows() {
    const newRow = document.createElement('div');
    newRow.classList.add('word-grid');
    for (let i = 0; i < currentWord.length; i++) {
        const box = document.createElement('div');
        box.classList.add('word-box');
        newRow.appendChild(box);
    }
    wordGrid.appendChild(newRow);
}

// Create keyboard
function createKeyboard() {
    keyboard.innerHTML = ""; // Clear previous keyboard
    alphabet.split('').forEach(letter => {
        const key = document.createElement('div');
        key.classList.add('key');
        key.textContent = letter;
        key.addEventListener('click', () => handleKeyPress(letter));
        keyboard.appendChild(key);
    });

    const deleteKey = document.createElement('div');
    deleteKey.classList.add('key', 'delete-key');
    deleteKey.textContent = String.fromCharCode(0x232B);
    deleteKey.addEventListener('click', handleDelete);
    keyboard.appendChild(deleteKey);

    const enterKey = document.createElement('div');
    enterKey.classList.add('key', 'enter-key');
    enterKey.textContent = String.fromCharCode(0x21B5);
    enterKey.addEventListener('click', handleEnter);
    keyboard.appendChild(enterKey);
}

function handleKeyPress(letter) {
    if (currentLetterIndex < currentWord.length) {
        const currentRowElement = wordGrid.children[currentRow];
        const boxes = currentRowElement.getElementsByClassName('word-box');
        boxes[currentLetterIndex].textContent = letter;
        currentGuess += letter;
        currentLetterIndex++;
    }
}

function handleDelete() {
    if (currentLetterIndex > 0) {
        currentLetterIndex--;
        const currentRowElement = wordGrid.children[currentRow];
        const boxes = currentRowElement.getElementsByClassName('word-box');
        boxes[currentLetterIndex].textContent = '';
        currentGuess = currentGuess.slice(0, -1);
    }
}

function handleEnter() {
    if (currentGuess.length === currentWord.length) {
        checkGuess();
        if (currentGuess === currentWord) {
            win();
        } else {
            currentRow++;
            currentLetterIndex = 0;
            currentGuess = "";
            createRows();
        }
    }
}


function checkGuess() {
    const currentRowElement = wordGrid.children[currentRow];
    const boxes = currentRowElement.getElementsByClassName('word-box');
    let wordCopy = currentWord.split('');

    for (let i = 0; i < currentGuess.length; i++) {
        if (currentGuess[i] === currentWord[i]) {
            boxes[i].style.backgroundColor = 'lightgreen';
            wordCopy[i] = null;
        }
    }

    for (let i = 0; i < currentGuess.length; i++) {
        if (wordCopy.includes(currentGuess[i]) && boxes[i].style.backgroundColor !== 'lightgreen') {
            boxes[i].style.backgroundColor = 'yellow';
            wordCopy[wordCopy.indexOf(currentGuess[i])] = null;
        }
    }

    for (let i = 0; i < currentGuess.length; i++) {
        if (!currentWord.includes(currentGuess[i]) && boxes[i].style.backgroundColor !== 'lightgreen' && boxes[i].style.backgroundColor !== 'yellow') {
            boxes[i].style.backgroundColor = 'gray';
            disableKey(currentGuess[i], 'gray');
        }
    }
}

function disableKey(letter, color) {
    const keys = document.getElementsByClassName('key');
    for (let i = 0; i < keys.length; i++) {
        if (keys[i].textContent === letter) {
            keys[i].style.backgroundColor = color;
            break;
        }
    }
}

// Function to be called on win
function win() {
    const translation = translations[currentWord.toLowerCase()];
    alert(`You have guessed right! The word is "${currentWord}", which means "${translation}" in Finnish.`);
    newGame(); // Start a new game after winning
}

// Initialize the game on page load
window.onload = newGame;






//***CHARACTER AND SPEECH BUBBLE***

const texts = [
    "OHJEITA",
    "TEE NÄIN",
    "TUOLTA TAPAHTUU SITÄ TÄTÄ JA TOTA",
    "JOS TEHET NÄIN NII TAPAHTUU TÄLLEESTI JA TOLLEESTI JA SIT NÄIN"
];

  // Reference to the text element
  const puheTeksti = document.getElementById('puheTeksti');

  // Counter to keep track of current text index
  let currentTextIndex = 0;
  let intervalId; // to hold the interval ID for pausing
  let isPaused = false; // to indicate if the carousel is paused

  // Function to update the text
  function updateText() {
      puheTeksti.textContent = texts[currentTextIndex];
  }

  // Function to start the carousel
  function startCarousel() {
      intervalId = setInterval(() => {
          currentTextIndex = (currentTextIndex + 1) % texts.length; // Loop through texts
          updateText();
      }, 4500); // Change text every 4.5 seconds
  }

  // Pause functionality
  document.getElementById('pauseButton').addEventListener('click', function() {
      if (!isPaused) {
          clearInterval(intervalId);
          intervalId = null; // Reset intervalId to indicate paused
          this.textContent = ">"; // Change icon to ">" when paused
      } else {
          startCarousel(); // Resume the carousel
          this.textContent = "||"; // Change icon back to "||" when running
      }
      isPaused = !isPaused; // Toggle the paused state
  });

  // Back button functionality
  document.getElementById('backButton').addEventListener('click', function() {
      currentTextIndex = (currentTextIndex - 1 + texts.length) % texts.length; // Go back
      updateText();
  });

  // Next button functionality
  document.getElementById('nextButton').addEventListener('click', function() {
      currentTextIndex = (currentTextIndex + 1) % texts.length; // Go forward
      updateText();
  });

  // Initialize the carousel on page load
  startCarousel();



//***SAVED WORDS VIEW***

//***TOPICS/ DICTIONARIES***
