function Player(_firstname, _lastname, _username, _phoneNumber, _city, _email, _bank) {
    
    this.firstName = _firstname;
    this.lastName = _lastname;
    this.username = _username;
    this.phoneNumber = _phoneNumber;
    this.city = _city;
    this.email = _email;
    this.bank = parseInt(_bank);
    this.bet = 0;

    this.makeBet = function(amt) { 
        if (amt != "") {
            if (isNaN(parseInt(amt))) {// isNaN
                alert(`${amt} is not a number`);
            }
            
            else if (parseInt(amt) > this.bank) {// is bigger than the bank
                console.log(this.bet);
                alert(`Not enough money! You only have $${this.bank}`);
                this.bet = 0;
            }
            
            else {// is a number
                this.bet = parseInt(amt);
                if (AI.gameMode === "PLAY") {
                    if($$("#btnPlay").style.backgroundColor === "green" ) {
                        alert("The round is already in play. Please pick your card!");
                    }
                    else {
                        AI.changeBtnColor("#btnPlay","green");
                        play();
                    }
                }
                else if (AI.gameMode === "Reverse") {
                    if($$("#btnReverse").style.backgroundColor === "green" ) {
                        alert("The round is already in play. Please pick your card!");
                    }
                    else {
                        AI.changeBtnColor("#btnReverse","green");
                        play();
                    }
                }
                else if (AI.gameMode === "W>L") {
                    AI.changeBtnColor("#btnWL","green");
                    play();
                }
                else if (AI.gameMode === "L>W") {
                    AI.changeBtnColor("#btnLW","green");
                    play();
                }
            }
        }
    else  {
        alert("Please enter a bet first !");
    }
}

    this.updateBank = function(amt) {
        this.bank += amt;
        $$("#moneyRemaining").innerHTML = this.bank.toLocaleString();
    }
}



function Computer() {

    this.gameMode = "";
    this.hasWon = function (betCard) {
        if (AI.gameMode === "") {
            alert("Please choose one of the game modes (PLAY, Reverse, W>L or L>W)");
        }
        else if (player.bet != 0 || player.bet != "") {
            if (AI.gameMode === "PLAY") {
                if (betCard.rank === hand.winningCard.rank && betCard.rank === hand.losingCard.rank) {
                    player.updateBank(parseInt(player.bet*0.5));
                    console.log(`AI took the half! ($${player.bet})`);
                    console.log(player.bank);
                    player.bet = 0;
                    this.changeBtnColor("#btnPlay","black");
                    hand.displayOutcome('tied');
                    hand.displayOutcomeCards();
                    hand.displayTieComment();
                    return true;
                }
                else if (betCard.rank === hand.winningCard.rank) {
                    if (AI.checkPlayedCards(betCard)) {
                        player.updateBank(player.bet*2);
                        player.bet = 0;
                        this.changeBtnColor("#btnPlay","black");
                        hand.displayOutcome('won');
                        hand.displayOutcomeCards();
                        return true;
                    }
                    else {
                        player.updateBank(parseInt(0-player.bet));
                        player.bet = 0;
                        this.changeBtnColor("#btnPlay","black");
                        hand.displayOutcome('lost');
                        hand.displayOutcomeCards();
                        return false;
                    }  
                }
                else if (betCard.rank === hand.losingCard.rank) {
                    player.updateBank(0-player.bet);
                    player.bet = 0;
                    this.changeBtnColor("#btnPlay","black");
                    if (player.bank === 0) {
                        AI.gameOver("outOfMoney");
                        window.location.replace("intro.html");
                    }
                    hand.displayOutcome('lost');
                    hand.displayOutcomeCards();
                    return false;
                }
                else {
                    if (AI.checkPlayedCards(betCard)) {
                        player.bet = 0;
                        this.changeBtnColor("#btnPlay","black");
                        hand.displayOutcome('missed');
                        hand.displayOutcomeCards();
                        return null;
                    }
                    else {
                        player.updateBank(parseInt(0-player.bet));
                        player.bet = 0;
                        this.changeBtnColor("#btnPlay","black");
                        hand.displayOutcome('lost');
                        hand.displayOutcomeCards();
                        return false;
                    }  
                }
            }
            else if (AI.gameMode === "Reverse") {
                if (hand.winningCard.rank === hand.losingCard.rank === betCard.rank) {
                    player.updateBank(parseInt(player.bet*0.5));
                    console.log(`AI took the half! ($${player.bet})`);
                    console.log(player.bank);
                    player.bet = 0;
                    this.changeBtnColor("#btnReverse","black");
                    hand.displayOutcome('tied');
                    hand.displayOutcomeCards();
                    hand.displayTieComment();
                    return true;
                }

                else if (betCard.rank === hand.winningCard.rank) {
                    if (AI.checkPlayedCards(betCard)) {
                        player.updateBank(0-player.bet);
                        player.bet = 0;
                        this.changeBtnColor("#btnReverse","black");
                        if (player.bank === 0) {
                            AI.gameOver("outOfMoney");
                            window.location.replace("intro.html");
                        }
                        hand.displayOutcome('lost');
                        hand.displayOutcomeCards();
                        return false;
                    }
                }
                
                else if (betCard.rank === hand.losingCard.rank) {
                    if (AI.checkPlayedCards(betCard)) {
                        player.updateBank(player.bet*2);
                        player.bet = 0;
                        this.changeBtnColor("#btnReverse","black");
                        hand.displayOutcome('won');
                        hand.displayOutcomeCards();
                        return true;
                    }
                    else {
                        player.updateBank(parseInt(0-player.bet));
                        player.bet = 0;
                        this.changeBtnColor("#btnReverse","black");
                        hand.displayOutcome('lost');
                        hand.displayOutcomeCards();
                        return false;
                    }
                }
                else {
                    if (AI.checkPlayedCards(betCard)) {
                        player.bet = 0;
                        this.changeBtnColor("#btnReverse","black");
                        hand.displayOutcome('missed')
                        hand.displayOutcomeCards();
                        return null;
                    }
                    else {
                        player.updateBank(parseInt(0-player.bet));
                        player.bet = 0;
                        this.changeBtnColor("#btnReverse","black");
                        hand.displayOutcome('lost');
                        hand.displayOutcomeCards();
                        return false;
                    }
                }
            }    
        }
        else {
            alert("Please make a bet first!");
        }   
    }
    this.higherLower = function() {
        if (AI.gameMode == "W>L") {
            if (hand.winningCard.value > hand.losingCard.value) {
                player.updateBank(player.bet*2);
                player.bet = 0;
                AI.changeBtnColor("#btnWL","black");
                hand.displayOutcome('won');
                hand.displayOutcomeCards();
                return true;
            }
            else if (hand.winningCard.value < hand.losingCard.value) {
                player.updateBank(0-player.bet);
                player.bet = 0;
                AI.changeBtnColor("#btnWL","black");
                if (player.bank === 0) {
                    AI.gameOver("outOfMoney");
                    window.location.replace("intro.html");
                }
                hand.displayOutcome('lost');
                hand.displayOutcomeCards();
                return false;
            }
            else if (hand.winningCard.value === hand.losingCard.value) {
                player.updateBank(parseInt(player.bet*0.5));
                console.log(`AI took the half! ($${player.bet})`);
                console.log(player.bank);
                player.bet = 0;
                AI.changeBtnColor("#btnWL","black");
                hand.displayOutcome('tied');
                hand.displayOutcomeCards();
                hand.displayTieComment();
                return null;
            }
        }
        else if (AI.gameMode == "L>W") {
            if (hand.winningCard.value < hand.losingCard.value) {
                player.updateBank(player.bet*2);
                player.bet = 0;
                AI.changeBtnColor("#btnLW","black");
                hand.displayOutcome('won');
                hand.displayOutcomeCards();
                return true;
            }
            else if (hand.winningCard.value > hand.losingCard.value) {
                player.updateBank(0-player.bet);
                player.bet = 0;
                AI.changeBtnColor("#btnLW","black");
                if (player.bank === 0) {
                    AI.gameOver("outOfMoney");
                    window.location.replace("intro.html");
                }
                hand.displayOutcome('lost');
                hand.displayOutcomeCards();
                return false;
            }
            else if (hand.winningCard.value === hand.losingCard.value) {
                player.updateBank(parseInt(player.bet*0.5));
                console.log(`AI took the half! ($${player.bet})`);
                console.log(player.bank);
                player.bet = 0;
                AI.changeBtnColor("#btnLW","black");
                hand.displayOutcome('tied');
                hand.displayOutcomeCards();
                hand.displayTieComment();
                return null;
            }
        }
    }

    this.exitGame = function() {
        this.exit = confirm("Are you sure you want to exit the game? Your data won't be saved!");
        if (this.exit === true) {
            alert(`Thank you for playing!\n\nPrize money: $${player.bank}\n`)
            AI.saveGame();
            window.location.replace("https://www.google.com/");
        }
    }

    this.saveGame = function () {
        localStorage.money = player.bank;
    }

    this.checkPlayedCards = function (card) {
        let counter = 0;
        for (let i = 0; i < hand.playedCards.length && counter < 3;i++){
            if (hand.playedCards[i][0].rank === card.rank) {
                counter++;
            }
        }
        if (counter === 3) {
            alert(`You lost. You cannot bet on a card rank which has already been revealed 3 times.`);
            return false;
        }
        else 
            return true;
    }

    this.close = function(el) {
        $$("." + el.parentNode.className).style.display = "none";
        if (el.parentNode.className == "message-box") {
            let allTds = document.querySelectorAll("td");
            for(let i = 0; i < allTds.length; i++) {
                allTds[i].innerHTML = "";
            }
        }
    }

    this.open = function(el) {
        $$(el).style.display = "block";
    }

    this.gameOver = function(msg) {
        if (msg === "outOfCards") {
            alert(`Game Over! No cards left! Thank you for playing!\n\n Prize money: $${player.bank}`);
        }
        else if (msg === "outOfMoney") {
            alert(`Game Over! You are bankrupt (0_0) ! Thank you for playing!`);
        }
        else {
            alert(`Game Over! Thank you for playing!`);
        }

        AI.saveGame();
        window.location.replace("https://www.google.com/");
    }
    this.chooseGameMode = function(mode) {
        this.gameMode = mode.value;
    }

    this.changeBtnColor = function(btn, color) {
        $$(btn).style.backgroundColor = color;
    }
}



function Card(_suit, _rank, _colour, _value) {

    this.suit = _suit;
    this.rank = _rank;
    this.colour = _colour;
    this.value = _value;
    this.cardImage = "./images/Playing Cards/"+this.suit+"/"+this.value+".png";
    
    this.drawCard = function() {
        return `${this.rank} of ${this.suit}`;
    }    
}

const ranks = ["Ace","2","3","4","5","6","7","8","9","10","Jack","Queen","King"];
const suits = ["Spades","Hearts","Clubs", "Diamonds"];



function Deck() {

    this.cards = [];
    this.newCards = [];

    this.createDeck = function() {  
        for (let i = 0; i < suits.length; i++) {
            for (let j = 0; j < ranks.length; j++) {
                if (i == 1 || i == 3) {
                    this.cards[this.cards.length] = new Card(suits[i], ranks[j], "R", j + 1);
                }               
                else {          
                    this.cards[this.cards.length] = new Card(suits[i], ranks[j], "B", j + 1);
                }                
            }                   
        }
        return this.cards;
    }
    
    this.shuffleDeck = function() {
        for(let i = 0; i < this.cards.length; i++) {
            let index1 = Math.floor(Math.random()*this.cards.length);
            let index2 = Math.floor(Math.random()*this.cards.length);
            let temp = this.cards[index1];
        
            this.cards[index1] = this.cards[index2];
            this.cards[index2] = temp;
        }
        return this.cards;
    }
}



function Hand() {

    this.cards = [];
    this.playedCards = [];
    
    this.cardToDiscard;
    this.losingCard;
    this.winningCard;

    this.handCards = function () {
        if (myDeck.cards.length > 2) {
            this.cards[0] = myDeck.cards[1];
            this.cards[1] = myDeck.cards[2]; 

            this.playedCards.push(myDeck.cards.splice(1,1));
            this.playedCards.push(myDeck.cards.splice(1,1));//<-- This needs to be done twice, as we want to push one object (card) per array
            
            this.losingCard = this.cards[0];
            this.winningCard = this.cards[1];

            return this.cards;
        }

        else {
            AI.gameOver("outOfCards");
        }
    }

    this.displayOutcome = function(outcome) {
        let resultDiv = $$(".result");
        
        if ($$("#comments").style.display === "block" && outcome !== 'tied')
            $$("#comments").style.display = "none";

        switch (outcome) {
            case 'won':
                resultDiv.className = "result won";
                resultDiv.textContent = "You won!";
                hand.openMsgBox();
                break;
            case 'lost':
                resultDiv.className = "result lost";
                resultDiv.textContent = "You lost!";
                hand.openMsgBox();
                break;
            case 'tied':
                resultDiv.className = "result tied";
                resultDiv.textContent = "It's a tie!";
                hand.openMsgBox();
                break;
            
            case 'missed':
                resultDiv.className = "result missed";
                resultDiv.textContent = "Missed it!";
                $$("#comments").style.display = "block";
                hand.openMsgBox();
                break;
            default:
                return false;
        }
    }

    this.openMsgBox = function() {
        hand.displayPlayedCards();
        $$(".message-box").style.display = "block";
    }
    
    this.displayOutcomeCards = function() {
        let allTds = document.querySelectorAll("td");
        let allThs = document.querySelectorAll("th");

        let yourCardHeading = allThs[1];
        let yourCardElement = allTds[1];

        let discardedCardElement = $$("#discardedCard")
        let winningCardElement = $$("#winningCard");
        let losingCardElement = $$("#losingCard");
        
        let discardedCard = hand.cardToDiscard;
        let winningCard = hand.winningCard;
        let losingCard = hand.losingCard;

        let discardedCardImg = document.createElement("img");
        let winningCardImg = document.createElement("img");
        let losingCardImg = document.createElement("img");
        
        if (AI.gameMode != "W>L" && AI.gameMode != "L>W") {

            let yourCard = myBoard.yourCard;
            let yourCardImg = document.createElement("img");

            yourCardImg.src = yourCard.cardImage; 
            yourCardImg.alt = yourCard.drawCard();
            yourCardElement.appendChild(yourCardImg);
            yourCardHeading.style.display = "block";
            yourCardElement.style.display = "block";
        }
        else {            
            yourCardElement.style.display = "none";
            yourCardHeading.style.display = "none";
        }

        discardedCardImg.src = discardedCard.cardImage;
        discardedCardImg.alt = discardedCard.drawCard();
        discardedCardElement.appendChild(discardedCardImg);
        
        if (AI.gameMode === "Reverse") {

            winningCardImg.src = losingCard.cardImage;
            winningCardImg.alt = losingCard.drawCard();
            winningCardElement.appendChild(winningCardImg);
            
            losingCardImg.src = winningCard.cardImage;
            losingCardImg.alt = winningCard.drawCard();
            losingCardElement.appendChild(losingCardImg);
        }
        else  {
            winningCardImg.src = winningCard.cardImage;
            winningCardImg.alt = winningCard.drawCard();
            winningCardElement.appendChild(winningCardImg);
            
            losingCardImg.src = losingCard.cardImage;
            losingCardImg.alt = losingCard.drawCard();
            losingCardElement.appendChild(losingCardImg);
        }

    }

    this.displayTieComment = function() {
        $$("#comments").style.display = "block";
    }

    this.discardFirstCard = function() {
        hand.cardToDiscard = myDeck.cards[0];
        console.log(`Card to discard: ${this.cardToDiscard.drawCard()}`);
        hand.playedCards.push(myDeck.cards.splice(0, 1));
    }

    this.displayPlayedCards = function() { 
        let playedCardsDiv = $$("#playedCards");
        playedCardsDiv.innerHTML = "";
        for(let i = 0; i < hand.playedCards.length; i++) {
            let newImg = document.createElement("img");
            newImg.src = hand.playedCards[i][0].cardImage; 
            newImg.alt = hand.playedCards[i][0].drawCard();
            playedCardsDiv.appendChild(newImg); 
        }
    }
}



function Board() {

    this.yourCard;
    this.allSpades = [];

    this.pickSpades = function() {
        this.counter = 0;
        
        for (let i = 0; i < myDeck.cards.length; i++) {
            if (myDeck.cards[i].suit === "Spades") {                  
                this.allSpades[this.counter] = myDeck.cards[i];
                this.counter++;
            }
        }
        myDeck.cards.splice(0, 13);
        
        return this.allSpades;
    }

    this.displaySpades = function() {
        for (let i = 0; i < myBoard.allSpades.length; i++) {
            let newImg = document.createElement("img"); 
            newImg.src = myBoard.allSpades[i].cardImage;
            newImg.alt = myBoard.allSpades[i].drawCard();
            newImg.onclick = function() {
                myBoard.yourCard = myBoard.allSpades[i];
                AI.hasWon(myBoard.yourCard);
                AI.gameMode = "";// reset the game mode
            }
            document.querySelector(".spades").appendChild(newImg);
        }    
    }
}