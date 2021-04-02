let canvas;
let ship;
let keysArray = [];
let bulletsArray = [];
let asteroidsArray = [];
let score = 0;

/***********************************************************************/
/*Entry point into game. Reference other .js files for abstracted code */
/***********************************************************************/

window.onload = () => {

  //to prevent pinch-zooming on mobile
  document.addEventListener('touchmove', (event) => {
    event.preventDefault();
  },  {passive: false });

  //setup the game canvas
  setupCanvas();

  //instantiate a new ship
  ship = new Ship();

  //setup keyboard to listen for input
  setupKeyboardInput();

  //retrieve highscore from local storage
  getLocalStorage();

  //enable soundFx listener
  enableSoundfx();

  //retrieve whether soundfx are on/off
  getLocalStorageSoundfxMenu();

  //enable music listener
  enableMusic();

  //retrieve whether music is on/off
  getLocalStorageMusicMenu();

  //for setting up the touch screen gamepad controller
  setupGamePadController();

  //render everything to the canvas
  renderGame();
};

function renderGame() {
  //check if ship moving forward, left or right
  checkKeyboardInput();

  //clear the canvas, to get ready for the next frame
  context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  //render starts to the game canvas
  renderStars();

  //signal game over if no lives left
  checkIfGameOver();

  //create a new level
  createNewLevel();

  //check if collision between ship and asteroid
  checkCollisionShipAsteroid();

  //check if collision between a bullet and asteroid
  checkCollisionBulletAsteroid();

  //update the ships position
  ship.updateShip();

  //render the ship
  ship.drawShip();

  //render the bullets
  renderBullets();

  //render the asteroids
  renderAsteroids();

  //render the text for 'Level" number and 'Game Over'
  renderOnScreenText();

  //update high score
  updateHighScore();

  //automated frame per second game loop. More efficient than setInterval()
  requestAnimationFrame(renderGame);
}
