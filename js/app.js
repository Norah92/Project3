// Enemies our player must avoid
var Enemy = function(x,y,speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
     
	this.x=x;
	this.y=y;
	this.speed = Math.floor(Math.random() * (300 - 100 + 1)) ;
	
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
	
	if(this.x < 505) {
		this.x += this.speed*dt;
	} else {
		this.x = 0;
	}
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
	
	this.x=200;
	this.y=300;
	this.sprite ='images/char-boy.png';	
};

// update player position
Player.prototype.update = function () {
	
	if (this.x < 40 || this.x > 500){
    if (this.x < 40){      
        this.x = 0;
    }
    else{
        this.x = 400;      
      }
    }

    if (this.y < 0 || this.y > 400) {
      if(this.y < 0) {
        this.y = -15;      
      }else {
        this.y = 400;      
    }

  }
   this.chickCollisions();
};

//  chick collisions
Player.prototype.chickCollisions = function() {
	
	var gamePlayer = this;
	allEnemies.forEach(function(enemy) {
            if (Math.abs(enemy.x - gamePlayer.x) < 50 && Math.abs(enemy.y - gamePlayer.y) < 60) {
				gamePlayer.reset();
			}
	});
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// control player movements
Player.prototype.handleInput = function (direction) {
	
	if (direction === 'left') {
		this.x = this.x - 101;
	}
	if (direction === 'up') {
		this.y = this.y - 83;
	}
	if (direction === 'right') {
		this.x = this.x + 101;
	}
	if (direction === 'down') {
		this.y = this.y + 83;
	} 
	else if (direction === 'up' && this.y <= 40) {
		this.reset();
	}
};

// reset player position
Player.prototype.reset = function() {
	
	this.x= 200;
	this.y= 300;
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var enemy1 = new Enemy (-50,70,'images/enemy-bug.png');
var enemy2 = new Enemy (-50,200,'images/enemy-bug.png');
var enemy3 = new Enemy (-50,250,'images/enemy-bug.png');
var enemy4 = new Enemy (-50,70,'images/enemy-bug.png');
var enemy5 = new Enemy (-50,150,'images/enemy-bug.png');


var allEnemies = [enemy1, enemy2, enemy3, enemy4, enemy5];

var player = new Player(200, 300);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
