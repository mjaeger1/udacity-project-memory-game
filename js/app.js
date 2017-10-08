// List that holds all cards (using Font Awesome icons, fontawesome.io)

var cardList = [
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


// Initial shuffle of cardList and creation of deck
cardList = shuffle(cardList);
createDeck(cardList);


// cardList shuffle and creation of deck at every restart of the game
document.getElementById('restart').addEventListener('click', function(){
  cardList = shuffle(cardList);
  createDeck(cardList);
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


// function to create deck with 16 cards incl. click-event listeners
function createDeck(array) {
  let deck = document.getElementById('deck');
  deck.innerHTML = '';
  let tempElement;
  array.forEach(function(element){
    tempElement = deck.appendChild(document.createElement("li"));
    tempElement.setAttribute("class","card");
    tempElement.addEventListener('click', function(event){
      console.log("card " + element + " clicked!");
    });
    tempElement = tempElement.appendChild(document.createElement("i"));
    tempElement.setAttribute("class",element);
  });
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
