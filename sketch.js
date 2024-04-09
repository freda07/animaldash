// Global variables for game elements
let gameState = "welcome";
let cat, trains = [];
let aImg, bImg, cImg, tImg,hImg,iImg; 
let dImg,eImg,fImg,gImg;
let score = 0;
let gameOver = false;
let cuteFont; //  displaying the score
let bgMusic;
let jumpSound,dieSound,newsceneSound;
let movingLeft = false;
let movingRight = false;
let newsceneSoundPlayed = false;
let lastSpawnTime = 0;
let spawnInterval = 120;

// Preload function to load assets before the game starts
function preload() {
  //background
  aImg = loadImage("animalbg.jpg");
  bImg = loadImage("flower.jpg");
  hImg = loadImage("house.jpg");
  iImg = loadImage("forest.jpg")
  //character
  cImg = loadImage("butterfly.png");
  dImg = loadImage("dog.png");
  gImg = loadImage("deer.png")
  //obstacles
  tImg = loadImage("obstacle1.jpg"); // posion flower
  eImg = loadImage("obstacle2.png")
  fImg = loadImage("obstacle3.png")
  //font
  cuteFont = loadFont("Honk-Regular.ttf");
  //background music
  bgMusic = loadSound("backgroundmusic.mp3")
  //sound effect
  jumpSound = loadSound('jump.mp3');
  dieSound = loadSound('die.mp3');
  newsceneSound = loadSound('changescene.mp3');
}

// Setup function to initialize the game
function setup() {
  createCanvas(800, 600);
  resetGame();
  bgMusic.setVolume(0.3);
  bgMusic.loop();
}

function mousePressed() {
  if (gameState === 'welcome') {
    let playButtonX = width / 2 - 50;
    let playButtonY = height * 2 / 4;
    let playButtonWidth = 100;
    let playButtonHeight = 40;
    if (mouseX >= playButtonX && mouseX <= playButtonX + playButtonWidth && mouseY >= playButtonY && mouseY <= playButtonY + playButtonHeight) {
      gameState = 'playing'; 
      if(!bgMusic.isPlaying()){
        bgMusic.loop();
      }
    }
  } else if (gameState === "gameOver") {
    let buttonX = width / 2 - 50;
    let buttonY = height *2 /4;
    let buttonWidth = 100;
    let buttonHeight = 40;

    if (mouseX >= buttonX && mouseX <= buttonX + buttonWidth && mouseY >= buttonY && mouseY <= buttonY + buttonHeight) {
      resetGame();
      gameState = 'welcome'; 
      bgMusic.stop();
    }
  } else if (gameState === 'playing' && !gameOver){

  } 
}

function keyPressed() {
  if (gameState === 'playing' && !gameOver) {
    if (key === ' ') {
      cat.jump();
      jumpSound.play();
    }
    if (keyCode === LEFT_ARROW) {
      movingLeft = true;
    } else if (keyCode === RIGHT_ARROW) {
      movingRight = true;
    }
  }
}

function keyReleased() {
  if (keyCode === LEFT_ARROW) {
    movingLeft = false;
  } else if (keyCode === RIGHT_ARROW) {
    movingRight = false;
  }
}

function draw() {
  if (gameState === 'welcome') {
    displayWelcome();
  } else if (gameState === 'playing') {
    playGame();
  } else if (gameState === 'gameOver') {
    displayGameOver();
  }
}

function playGame() {
  //change background scene based on score
  if (score < 5) {
    background(bImg);
  } else if (score >= 5 && score < 10) {
    background(hImg); 
  } else if (score >= 10) {
    background(iImg);
  }

  if (movingLeft) {
    cat.moveLeft();
  }
  if (movingRight) {
    cat.moveRight();
  }

  cat.move();
  manageTrains();

 if (score >= 5 && score < 10) {
  image(dImg, cat.x, cat.y, cat.r, cat.r); 
} else if (score >= 10) {
  image(gImg, cat.x, cat.y, cat.r, cat.r); 
} else {
  cat.show(); 
}
 
  displayScore();
}

// Function to manage obstacle logic
function manageTrains() {
  spawnInterval = max(60, 120 - score * 2);

  if (frameCount - lastSpawnTime > spawnInterval) {
      let obstacleImage = tImg;
      if (score >= 5 && score < 10) {
          obstacleImage = eImg;
      } else if (score >= 10) {
          obstacleImage = fImg;
      }

      trains.push(new Train(obstacleImage));
      lastSpawnTime = frameCount;
  }

  for (let i = trains.length - 1; i >= 0; i--) {
      trains[i].move();
      trains[i].show();
      if (trains[i].x + trains[i].r < 0) {
          trains.splice(i, 1);
          score++;
          
          if (score != 5 && score != 10) {
              newsceneSoundPlayed = false;
          }
      }

      if ((score === 5 || score === 10) && !newsceneSoundPlayed) {
          newsceneSound.play();
          newsceneSoundPlayed = true; 
      }

      if (cat.hits(trains[i])) {
          gameState = 'gameOver';
          bgMusic.stop();
          dieSound.play();
          return;
      }
  }
}

// Function to display the current score
function displayScore() {
  fill(255);
  textSize(40);
  textFont(cuteFont);
  textAlign(RIGHT, TOP);
  text(`Score: ${score}`, width - 10, 10);
}

// Show game over screen and score
function displayGameOver() {
  background(aImg); 
  fill(255, 0, 0); 
  textSize(80);
  textFont(cuteFont);
  textAlign(CENTER, CENTER);
  text("Game Over", width / 2, height / 3);

  //restart game button
  fill(255);
  rect(width / 2 - 50, height * 2 / 4, 100, 40, 20);
  fill(0);
  textSize(20);
  textFont('Verdana');
  text("Restart", width / 2, height * 2 / 4 + 20);
}

// Show welcome screen with instructions
function displayWelcome() {
  background(aImg);
  fill(0, 51, 102);
  textSize(40);
  textFont('Verdana');
  textAlign(CENTER, CENTER);
  text("Welcome to Animal Dash", width / 2, height / 5);

  textSize(20);
  text("Use SPACE to jump, LEFT and RIGHT arrows to move.\nPress SPACE and arrows together to navigate.\nClick 'Play' to start the game.", width / 2, height / 3);
  fill(255);
  rect(width / 2 - 50, height * 2 / 4, 100, 40, 20);
  fill(0);
  textSize(20);
  text("Play", width / 2, height * 2 / 4 + 20);
}

function resetGame() {
  trains = []; 
  score = 0; 
  gameOver = false; 
  cat = new Cat(); 
  newsceneSoundPlayed = false;
}