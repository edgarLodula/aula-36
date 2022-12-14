var canvas;
var backgroundImage;
var bgImg;
var database;
var form, player;
var playerCount, gameState, allPlayers;
var car1, car2, car1_img, car2_img,track,lifeImage;
var cars = [];
var fuels, powerCoins, obstacles;
var fuelImage, powerCoinImage, obstacle1Image, obstacle2Image, blastImage;

function preload() {
  backgroundImage = loadImage("assets/planodefundo.png");
  car1_img = loadImage ("assets/car1.png");
  car2_img = loadImage ("assets/car2.png");
  track = loadImage ("assets/PISTA.png");

  fuelImage = loadImage("assets/fuel.png");
  powerCoinImage = loadImage("assets/goldCoin.png");

  obstacle1Image = loadImage("assets/obstacle1.png");
  obstacle2Image = loadImage("assets/obstacle2.png");

  lifeImage = loadImage("assets/life.png");
  blastImage = loadImage("assets/blast.png");
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();

}

function draw() {
  background(backgroundImage);
  if (playerCount === 2) {
    game.update(1);
  }
  
  if (gameState === 1) {
    game.play();
  }


}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
