var view = {
    displayMessage : function (msg) {
        var massageArea = document.getElementById('messageArea');
        massageArea.innerHTML = msg;
    },
    displayHit : function (location) {
        var  cell = document.getElementById(location);
        cell.setAttribute("class", "hit");
    },
    displayMiss : function (location) {
        var cell = document.getElementById(location);
        cell.setAttribute("class", "miss");
    }
};
var model = {
    boardSize : 7,
    numShips : 3,
    shipLength : 3,
    shipsSunk : 0,
    ships : [
        { location : ["06", "16", "26"], hits : ["", "", ""]},
        { location : ["24", "34", "44"], hits : ["", "", ""]},
        { location : ["10", "11", "12"], hits : ["", "", ""]}
    ],

    fire : function(guess){
        for (var i =0; i<this.numShips; i++){
            var ship = this.ships[i];
            var index = ship.location.indexOf(guess);
            if (index>=0){
                ship.hits[index] = "hit";
                view.displayHit(guess);
                view.displayMessage('HIT');
                if (this.isSunk(ship)){
                    view.displayMessage("you sank my battleship");
                    this.shipsSunk++;
                }
                return true;
            }
        }
        view.displayMiss(guess);
        view.displayMessage("You missed");
        return false;
    },
    isSunk : function (ship) {
        for (var i = 0; i<ship.hits.length; i++){
            if (ship.hits[i] !== "hit"){
                //console.log("function iS sunk -> false");
                return false;
            }
        }
        //console.log("function iS sunk -> true");
        return true;
    },
    generateShipLocation : function(){
        var location;
        for (var i = 0; i<this.numShips; i++){
            do {
                location = this.generateShip();
            } while (this.collision(locayion));
            this.ships[i].location = location;
        }
    },
    generateShip : function(){
        var directin = Math.floor(Math.random() *2 );
        var row, col;

        if (directin === 1){
            //сгенерировать начальную позицию для горизонтального корабля
        } else {
            //сгенерировать начальную позици для вертикального корабля
        }
    }
};
var controller = {
    guess: 0,
    processGuess : function(guess){
        var location = this.parseGuess(guess);
        if (location){
            this.guess++;
            var hit = model.fire(location);
            if (hit && model.shipsSunk === model.numShips){
                view.displayMessage("you sunk all my battleship, in " + this.guess + " guesses");
                console.log(1);
            }
        }
    },
    parseGuess : function(guess){
        var alphabet = ["A", "B", "C", "D", "E", "F", "G"];

        if (guess === null || guess.length !== 2){
            alert("Oops, please enter a letter and a number on the board");
        } else {
            firstChar = guess.charAt(0);
            var row = alphabet.indexOf(firstChar);
            var column = guess.charAt(1);

            if (isNaN(row)|| isNaN(column)){
                alert("Oops, that isn't on the board.")
            } else if (row < 0 || row >= model.boardSize || column < 0 || column >= model.boardSize){
                alert("Oops, that's of the board!")
            } else {
                return row + column;
            }
        }
        return null;
    }
};


// event handlers

function handleFireButton() {
    var guessInput = document.getElementById("guessInput");
    var guess = guessInput.value.toUpperCase();

    controller.processGuess(guess);

    guessInput.value = "";
}

function handleKeyPress(e) {
    var fireButton = document.getElementById("fireButton");

    // in IE9 and earlier, the event object doesn't get passed
    // to the event handler correctly, so we use window.event instead.
    e = e || window.event;

    if (e.keyCode === 13) {
        fireButton.click();
        return false;
    }
}

function init() {
    var firebutton = document.getElementById("fireButton");
    firebutton.onclick = handleFireButton;
    var guessInput = document.getElementById("guessInput");
    guessInput.onkeypress = handleKeyPress;

}

window.onload = init;

