console.log('Sanity Check!')

{/* <script> */}
function myFunction() {
  var popup = document.getElementById("myPopup");
  popup.classList.toggle("show");
}
{/* </script> */}

// DOM function that pulls memory cards from html to js
const cards = document.querySelectorAll('.memory-card');
const sound = document.getElementById('sound');


let hasFlippedCard = false;
let stopBoard = false;
let firstCard, secondCard;




// function that checks if cards are match on flip
function flipCard() {
    if(stopBoard) return;
    if(this === firstCard) return;


    this.classList.add('flip');

    if (!hasFlippedCard) {
        // first click
        hasFlippedCard = true;
        firstCard = this;

        return;
    }
        // second click
        secondCard = this;

        checkForMatch();
}

// function that checks if the cards match & Sound
function checkForMatch() {
    let isMatch = firstCard.dataset.name === secondCard.dataset.name;
    let soundFlag = true;

    if (firstCard.dataset.name === secondCard.dataset.name) {
        sound.pause();
        sound.currentTime = 0;
        sound.play();
        soundFlag = false;
    }

    isMatch ? disableCards() : unflipCards();
}



// stop cards if it is a match
function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}

// if it is NOT a match
function unflipCards() {
    stopBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

    resetBoard();
    }, 1500);
}

// function to reset the board to normal
function resetBoard() {
    hasFlippedCard = false;
    stopBoard = false;
    firstCard = null; 
    secondCard = null;
}

// function to shuffle cards each new game/refresh
(function shuffle() {
    cards.forEach(card => {
        let randomCard = Math.floor(Math.random() * 16);
        card.style.order = randomCard;
    });
    // background music
    // bgm.play();
})();

// event listener to flip card on click
cards.forEach(card => card.addEventListener('click', flipCard));