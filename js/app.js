// Array that holds all cards (using Font Awesome icons, fontawesome.io)
let cardList = [
  'fa fa-car',
  'fa fa-car',
  'fa fa-bicycle',
  'fa fa-bicycle',
  'fa fa-ship',
  'fa fa-ship',
  'fa fa-subway',
  'fa fa-subway',
  'fa fa-truck',
  'fa fa-truck',
  'fa fa-rocket',
  'fa fa-rocket',
  'fa fa-ambulance',
  'fa fa-ambulance',
  'fa fa-motorcycle',
  'fa fa-motorcycle'
];

// Array that holds all open cards
let openCards = [];

// Variable counting moves taken
let moves = 0;
const moveCounter = document.getElementById('moves');
moveCounter.innerHTML = moves;

// Initial shuffle of cardList and creation of deck
cardList = shuffle(cardList);
createDeck(cardList);


// CardList shuffle and creation of deck at every restart of the game
document.getElementById('restart').addEventListener('click', function(){
  cardList = shuffle(cardList);
  createDeck(cardList);
  moveCounter.innerHTML = 0;
  }
);


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


// Function to create deck with 16 cards incl. click-event listeners
function createDeck(array) {
  let deck = document.getElementById('deck');
  deck.innerHTML = '';
  let tempElement;

  array.forEach(function(element){
    tempElement = deck.appendChild(document.createElement("li"));
    tempElement.setAttribute("class","card");

    // Event listener
    tempElement.addEventListener('click', function(event){
      moveCounter.innerHTML = ++moves;
      displaySymbol(this);
    });

    tempElement = tempElement.appendChild(document.createElement("i"));
    tempElement.setAttribute("class",element);
  });
}

// Function to display cards
function displaySymbol(card){
  card.className = "card open show";
  matchOrNoMatch(card);
}

// Function covering the core game logic, i.e. checks if the card just open results in a match or not
function matchOrNoMatch(card){
  let cardClassName = card.firstElementChild.className;
  if (openCards.length > 0) {
    if (openCards.indexOf(cardClassName) === -1) { // Not first card, not already in, not a match
      if (openCards.length % 2 !== 0) {
        window.setTimeout(hideSymbol,3000,cardClassName); // Hide current card
        window.setTimeout(hideSymbol,3000,openCards.pop()); // Remove previous card from openCards, and hide it
      } else {
        addToOpenCards(cardClassName); // Add card always if opening the first of a pair of cards
      }
    } else { // Not first card, card already in => yay, it's a match !!!
      addToOpenCards(cardClassName);
    }
  } else { // Add first card
    addToOpenCards(cardClassName);
  }
}

// Function to add cards to array of open cards and check whether game is completed
function addToOpenCards(cardClassName){
  openCards.push(cardClassName);
  if (openCards.length === 16) {
    window.setTimeout(window.alert,1000,"congrats - game completed after " + moves + " moves!");
  }
}

// Function to hide cards again if not a match
// Note: not the niciest implementation since it also changes the class of elements that already have the correct class
function hideSymbol(cardClassName){
  var cardsToHide = document.getElementsByClassName(cardClassName);
  cardsToHide[0].parentElement.className = "card";
  cardsToHide[1].parentElement.className = "card";
}
