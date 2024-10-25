


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





// Funktio, joka lataa tallennetut sanat ja näyttää ne listalla saved words -sivulla
function loadSavedWords() {
    const savedList = document.getElementById('savedWordsList');
    
    // Tarkistetaan, että savedWordsList-elementti on olemassa tällä sivulla
    if (savedList) {
        const savedWords = JSON.parse(localStorage.getItem('savedWords')) || [];
        savedList.innerHTML = ''; // Tyhjennetään lista ennen lataamista

        savedWords.forEach(item => {
            const listItem = document.createElement('li');
            listItem.textContent = `${item.word} = ${item.translation}`;
            savedList.appendChild(listItem);
        });
    }
}

// Kutsutaan loadSavedWords vain, jos olemme saved words -sivulla
window.onload = loadSavedWords;