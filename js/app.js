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


let openCards = []; // Array that holds all open cards
let moveCounter; // will be assigned to DOM element "moves"
let moves = 0; // Variable counting moves that have been taken
let stars; // will be assinged to DOM elements with class names "fa fa-star"

if (document.title === "Matching Game") {

  moveCounter = document.getElementById('moves');
  moveCounter.innerHTML = moves;

  stars = document.getElementsByClassName('fa fa-star');

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
}

if (document.title === "Matching Game - Success Screen") {
  // document.getElementById('performance').innerHTML = "With " + moves + " moves and x stars";
}


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
      // change number of stars after certain amount of moves
      if (moves === 20){
        stars[2].setAttribute("class","fa fa-star-o");
      } else if (moves === 30) {
        stars[1].setAttribute("class","fa fa-star-o");
      } else if (moves === 30) {
        stars[1].setAttribute("class","fa fa-star-o");
      }
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

  if (openCards.length === 0) { // first card
    addToOpenCards(cardClassName);
    } else {
    if (openCards.indexOf(cardClassName) === -1) { // Not a match (either because just 1 card open or really no match)
      if (openCards.length % 2 !== 0) { // really not a   match
        window.setTimeout(changeClass,3000,cardClassName,"card"); // Hide current card
        window.setTimeout(changeClass,3000,openCards.pop(),"card"); // Remove previous card from openCards, and hide it

        // disables all mouse events (to ensure no additional card can be picked while 2 are open)
        var allCards = document.getElementsByClassName("card");
        for (var i = 0; i < allCards.length; i++) {
          allCards[i].style.pointerEvents = "none";
        }

      } else {
        addToOpenCards(cardClassName); // Add card always if opening the first of a pair of cards
      }
    } else { // yay, it's a match !!!
      addToOpenCards(cardClassName);
      changeClass(cardClassName,"card match");
    }
  }
}

// Function to add cards to array of open cards and check whether game is completed
function addToOpenCards(cardClassName){
  openCards.push(cardClassName);
  if (openCards.length === 1) {
    window.setTimeout(function(){window.location.href = "./html/congrats.html";},3000);
  }
}

// Function to change class of a pair of cards
function changeClass(currentClassName, newClassName){
  let cardsToChange = document.getElementsByClassName(currentClassName);
  cardsToChange[0].parentElement.className = newClassName;
  cardsToChange[1].parentElement.className = newClassName;

  if (newClassName === "card") {
    //enable mouse events again
    var allCards = document.getElementsByClassName("card");
    for (var i = 0; i < allCards.length; i++) {
      allCards[i].style.pointerEvents = "auto";
    }
  }
}
