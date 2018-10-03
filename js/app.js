
// custom
// increase enemies by score
let score = 0;

// Enemies our player must avoid
let Enemy = function (xCoordinate, yCoordinate, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.xCoordinate = xCoordinate;
    this.yCoordinate = yCoordinate;
    this.speed       = speed;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.xCoordinate = this.xCoordinate + this.speed * dt;
    if (this.xCoordinate >= 505) {
        this.xCoordinate = 0;
    }
    this.checkCollision();
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.xCoordinate, this.yCoordinate);
};

// checks en enemy's collision with player
Enemy.prototype.checkCollision = function () {
    if (player.yCoordinate + 131 >= this.yCoordinate + 90 &&
        player.yCoordinate + 73 <= this.yCoordinate + 135 &&
        player.xCoordinate + 25 <= this.xCoordinate + 88 &&
        player.xCoordinate + 76 >= this.xCoordinate + 11) {
        console.log('collision');
        gameReset();
    }
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
let Player = function (xCoordinate, yCoordinate, speed) {
    this.xCoordinate = xCoordinate;
    this.yCoordinate = yCoordinate;
    this.speed       = speed;
    this.sprite      = 'images/char-boy.png';
};

// Update method for Player
Player.prototype.update = function () {
};

// Renders the player
Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.xCoordinate, this.yCoordinate);
};

/*
 * Handles input for the player
 */
Player.prototype.handleInput = function (key) {
    if (key == 'left') {
        this.xCoordinate = (
                               this.xCoordinate - this.speed + 505) % 505;
    }
    else if (key == 'right') {
        this.xCoordinate = (
                               this.xCoordinate + this.speed) % 505;
    }
    else if (key == 'up') {
        this.yCoordinate = (
                               this.yCoordinate - this.speed + 606) % 606;
        if (this.yCoordinate <= (
            83 - 48)) {
            gameOver();
            return;
        }
    }
    else {
        this.yCoordinate = (
                               this.yCoordinate + this.speed) % 606;
        if (this.yCoordinate > 400) {
            this.yCoordinate = 400;
        }
    }
    // xCoordinate axis wrap
    if (this.xCoordinate < 2.5) {
        this.xCoordinate = 2.5;
    }
    if (this.xCoordinate > 458) {
        this.xCoordinate = 458;
    }
};

/*
 * Resets the player to default position
 */
Player.prototype.reset = function () {
    this.xCoordinate = 202.5;
    this.yCoordinate = 383;
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let allEnemies = [];
let player     = new Player(0, 0, 50);
let scoreDiv   = document.createElement('div');
gameReset(); // setup defaults
let canvasDiv = document.getElementsByTagName('canvas')[0];
document.body.insertBefore(scoreDiv, canvasDiv);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    let allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

/*
 * resets the game in case of collision
 */
function gameReset() {
    player.reset();
    score = 0;
    updateDisplay();
    allEnemies = [];
    allEnemies.push(
        new Enemy(0, Math.random() * 150 + 50, Math.random() * 100 + 40),
        new Enemy(0, Math.random() * 150 + 70, Math.random() * 100 + 60)
    );
}

/*
 * Game over successfully
 */
function gameOver() {
    player.reset();
    score += 1;
    updateDisplay();
    if (score % 2 == 0 && allEnemies.length < 4) {
        allEnemies.push(new Enemy(0, Math.random() * 160 + 50, Math.random() * 90 + 70));
    }
}

/*
 * Updates the on screen score display
 */
function updateDisplay() {
    scoreDiv.innerHTML = 'Score ' + score;
}
