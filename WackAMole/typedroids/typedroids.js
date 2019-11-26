//Constants
const width = 1400; // Might want to set this to device size
const height = 900; // Currently setup for my 1080p 16x9 laptop
const dictionary = ['the', 'quick', 'brown', 'fox', 'jumped', 'over', 'lazy',
	'coyote', 'usb', 'barber', 'cat', 'dog', 'linux', 'windows', 'wire',
	'bread', 'ada', 'school', 'mac', 'python', 'cookie', 'doom', 'destroy', 'blob', 'why',
'Europa', 'NASA']

// game variables
let canvas; // our canvas to draw on
let ctx; // for drawing
let world; // our planet or main character
let asteroids = [];
let lives = 3; // zero on lost NOT WORKING AT THE MOMENT
let score = 0;
let highscore = 0; // For highscore
let wasHit = false; // so we don't get hit on respawn NOT IMPLEMENTED


document.addEventListener('DOMContentLoaded', SetupGame);

function SetupGame() {
	canvas = document.getElementById('gameboard');
	ctx = canvas.getContext('2d');
	canvas.height = height;
	canvas.width = width;
	ctx.fillStyle = 'black';
	ctx.fillRect(0,0,canvas.width, canvas.height);
	highscore = getHighScore();
	// Create one asteroids on start to make it easier
	document.body.addEventListener("keydown", function(e) {
		typeRock(e.key);
	});
	world = new World();
	asteroids.push(new Asteroid());
	renderGame();
}

// we can store the previous highscore in the user's browser
// this is how to access it
// we set it to zero if the localStorage returns None
function getHighScore() {
	return localStorage.getItem('highscore') || 0;
}


// Our static character
class World {
	constructor() {
		this.x = width / 2;
		this.y = height / 2;
		this.radius = 15;
		this.ringRadiusX = 25;
		this.ringRadiusY = 10;
		this.rotation = 0;
		this.visible = 'true';
	}
	Update() {
		// stub
	}
	Draw() {
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
		void ctx.ellipse(this.x, this.y, this.ringRadiusX, this.ringRadiusY, this.rotation, 0, 2 * Math.PI);
		ctx.closePath();
		ctx.stroke();
	}
}

class Asteroid {
	constructor(x, y, level) {
		this.letter = dictionary[getRandomInt(dictionary.length)];
		// we have to check if the parameters are undefined
		if (x === undefined) {
			this.x = getRandomInt(width);
		} else {
			this.x  = x;
		}
		if (y === undefined) {
			this.y = getRandomInt(height);
		} else {
			this.y = y;
		}
		if (level === undefined) {
			this.level = 4;
		} else {
			this.level = level;
		}
		// set size for rocks
		if (this.level === 4) {
			this.radius = 85;
			this.collisionRadius = 80;
		} else if (this.level === 3) {
			this.radius = 75;
			this.collisionRadius =70;
		} else if (this.level === 2) {
			this.radius = 50;
			this.collisionRadius = 46;
		} else if (this.level === 1) {
			this.radius = 25;
			this.collisionRadius = 22;
		} else {
			this.radius = 15;
			this.collisionRadius = 12;
		}
		this.speed = 3;
		this.angle = getRandomInt(360);
		this.side = getRandomRangeInt(6, 8); // add some variety to the asteroids
		this.vertAngle = ((Math.PI * 2) / this.side);
		this.radians = this.angle / Math.PI * 180;
	}
	Update() {
		// our main concern is wrap-around for when the
		// asteroids reach the edge of the screen
		this.x += Math.cos(this.radians) * this.speed;
		this.y += Math.sin(this.radians) * this.speed;
		if (this.x < this.radius) {
			this.x = canvas.width;
		}
		if (this.x > canvas.width) {
			this.x = this.radius;
		}
		if (this.y < this.radius) {
			this.y = canvas.height;
		}
		if (this.y > canvas.height) {
			this.y = this.radius;
		}
	}
	Draw() {
		ctx.beginPath();
		// Drawing a n-sided polygon in vectors requires math
		// Might have been better to use an image
		for(let i = 0; i < this.side; i++) {
			ctx.lineTo(this.x - this.radius * Math.cos(this.vertAngle * i + this.radians),
				this.y - this.radius * Math.sin(this.vertAngle * i + this.radians)
			); 
		}
		ctx.closePath();
		ctx.stroke();
		ctx.fillText(this.letter, this.x, this.y);
	}
}

// Treating everything as if it was a circle for collision
// It is an estimate not perfect, but hopefully close enough to not be noticed
function collision(x1, y1, r1, x2, y2, r2) {
	const radius = r1 + r2;
	const diffX = x1 - x2;
	const diffY = y1 - y2;
	const distance = Math.sqrt(Math.pow(diffX, 2) + Math.pow(diffY, 2))
	if (radius > distance) {
		return true;
	}
	return false;
}


// we need a death animation
function killWorld() {
	lives -= 1;
	wasHit = true;
}


// Utility function
// source: courtesy of https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomInt(max) {
	return Math.floor(Math.random() * max);
}

// Utility function
// source: courtesy of https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomRangeInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; 
}

// for writing letters and breaking rocks
function typeRock(letter) {
	if (lives >= 0) {
		for (i = 0; i < asteroids.length; i++) {
			if (asteroids[i].letter[0] === letter) {
				asteroids[i].letter = asteroids[i].letter.substr(1);
				if (asteroids[i].letter === '') {
					hitRock(i);
				}
			}
		}
	}
}

// hitRock breaks the rock into smaller rocks by creating new rocks
// sometimes the new rocks will appear at a different area. Maybe a bug?
function hitRock(i) {
	let level = asteroids[i].level;
	if (level > 0) {
		asteroids.push(new Asteroid(asteroids[i].x, asteroids[i].y, level-1));
		asteroids.push(new Asteroid(asteroids[i].x, asteroids[i].y, level-1));
	}
	asteroids.splice(i, 1);
	score += 20;
}

function gameOver() {
	world.visible = false;
	ctx.font = '50px hack';
	if (score > highscore) {
		localStorage.setItem('highscore', score);
		ctx.fillText('--GAME OVER--', width * 3 / 8, height / 2);
		ctx.fillText('NEW HIGHSCORE', width * 3 / 8, height / 2 - 45);
	} else {
		ctx.fillText('--GAME OVER--', width * 3 / 8, height / 2);
	}
}

// Our very complex drawing function and game logic
// Becareful as the slowdowns can happen here with too much objects or logic
function renderGame() {
	ctx.clearRect(0, 0, width, height);
	ctx.fillStyle = 'white';
	if (lives <= 0) {
		gameOver();
	}
	ctx.font = '21px hack';
	ctx.fillText('SCORE: ' + score.toString(), 20, 35);
	ctx.fillText('HIGHSCORE: ' + highscore.toString(), 20, 65);
	ctx.strokeStyle = 'white';

	// Do not draw the world if hidden
	if (world.visible) {
		world.Draw();
	}
	// Check for collision
	// Also, do not hit the planet if we restarted the game
	// lives are currently broken
	if (asteroids.length !== 0) {
		for (let i = 0; i < asteroids.length; i++) {
			if (collision(world.x, world.y, 11, asteroids[i].x, asteroids[i].y, asteroids[i].collisionRadius)) {
				killWorld();
				break;
			}
		}
	}

	// Redraw the asteroids
	if (asteroids.length !== 0) {
		for (let i = 0; i < asteroids.length; i++) {
			asteroids[i].Update();
			asteroids[i].Draw();
		}
	} else {
		// Restart the game due to no asteroids
		for (let i = 0; i < 2; i++) {
			asteroids.push(new Asteroid());
		}
	}
	requestAnimationFrame(renderGame);
}
