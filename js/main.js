let player = new Player(firstName,lastName,username,phoneNum,city,email,money);
let AI = new Computer();
let myDeck = new Deck();
let myBoard = new Board();
let hand = new Hand();


$$("#exitGame").addEventListener("click", AI.exitGame);
$$("#openPlayedCards").addEventListener("click", function(){AI.open('.played-cards-box')});
$$("#playedCardsClose").addEventListener("click", function(){AI.close(this)});
$$("#msgBox").addEventListener("click", function(){AI.close(this)});
$$("#btnPlay").addEventListener("click", function(){AI.chooseGameMode(this)});
$$("#btnPlay").addEventListener("click", function(){player.makeBet(bet.value)});

$$("#btnReverse").addEventListener("click", function(){AI.chooseGameMode(this)});
$$("#btnReverse").addEventListener("click", function(){player.makeBet(bet.value)});

$$("#btnWL").addEventListener("click", function(){AI.chooseGameMode(this)});
$$("#btnWL").addEventListener("click", function(){player.makeBet(bet.value)});

$$("#btnLW").addEventListener("click", function(){AI.chooseGameMode(this)});
$$("#btnLW").addEventListener("click", function(){player.makeBet(bet.value)});


myDeck.createDeck();
myBoard.pickSpades();
myBoard.displaySpades();

let play = function() {
    hand.discardFirstCard();// Removes the first cards
    myDeck.shuffleDeck();// shuffles the deck
    hand.handCards();// Determines winning and losing cards
    if (AI.gameMode === "W>L" || AI.gameMode === "L>W")// runs a function for the other game modes 
        console.log(AI.higherLower());
    console.log(`Winning card: ${hand.winningCard.drawCard()}`);
    console.log(`Losing card: ${hand.losingCard.drawCard()}`);
    console.log(hand.playedCards);
    // hand.displayPlayedCards();
}
