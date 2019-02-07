var lastFrameTime; // Time of the last frame

var playerImg;

var playerCollider;
var floor;

var context;

var canvas;

var isGrounded;

var prevPlayerPos;


/*
 * Initializes the main components for our game.
 */
window.onload = function init()
{
	canvas = document.getElementById('canvas');
	context = canvas.getContext('2d');
	playerImg = new Image();
	playerCollider = new Collider(new Vector2(69, 50), 100, 100, 1);
	floor = new Collider(new Vector2(50, 200), 500, 10, 0);

	playerImg.onload = function() {
		context.drawImage(playerImg, playerCollider.position.x, playerCollider.position.y, playerCollider.width, playerCollider.height);
	};
	playerImg.src = 'sprites/TurtleDown.png';
	
	lastFrameTime = Date.now();
	
	
	document.onkeydown = onKeyDown;
    document.onkeyup = onKeyUp;
	
	prevPlayerPos = playerCollider.position;
	
	
	// End of Load, move to game loop
	loop();
}


/*
 * Our main loop for our game.
 */
function loop()
{
	var currentFrameTime = Date.now();
	var dt = (currentFrameTime - lastFrameTime) / 20; // Delta time (change in time since the last frame) // Should be divided by 1000, but those are harder numbers to work with
	lastFrameTime = currentFrameTime; // Reset the last frame time so we can calculate dt on next loop
	
	playerCollider.update(dt);
	
	if (playerCollider.checkCollision(floor) == "BOTTOM")
	{
		playerCollider.velocity = new Vector2(playerCollider.velocity.x, 0);
		playerCollider.position = new Vector2(playerCollider.position.x, floor.position.y - playerCollider.height);
		isGrounded = true;
	}
	
	context.translate(playerCollider.position.x - prevPlayerPos.x, 0);//playerCollider.position.y - prevPlayerPos.y);
	
	prevPlayerPos = playerCollider.position;
	
	// End of Loop, render then repeat
	render();
	requestAnimationFrame(loop);
	//requestAnimFrame(loop); // Call our loop again after after rendering and before repainting so that we can properly animate
}

/*
 * Renders the components of our game.
 */
function render()
{
	context.clearRect(0, 0, canvas.width, canvas.height);
	context.beginPath();
	context.rect(floor.position.x, floor.position.y, floor.width, floor.height);
	context.fillStyle = "red";
	context.fill();
	//context.drawImage(playerImg, 100, 100, 100, 100);
	context.drawImage(playerImg, playerCollider.position.x, playerCollider.position.y, playerCollider.width, playerCollider.height);
}



/*
 * Handles events when a key is pressed.
 */
function onKeyDown(event)
{
    var key = String.fromCharCode(event.keyCode);

    switch (key) {
        case 'A':
            //Move Left
			if (playerCollider.velocity.x > -3)
			{
				playerCollider.velocity = playerCollider.velocity.add(new Vector2(-3, 0));
			}
            break;

        case 'D':
            //Move Right
			if (playerCollider.velocity.x < 3)
			{
				playerCollider.velocity = playerCollider.velocity.add(new Vector2(3, 0));
			}
            break;

		case 'W':
			//Jump
			if (isGrounded)
			{
				playerCollider.velocity = new Vector2(playerCollider.velocity.x, -20);
				isGrounded = false;
			}
			break;

        default:
            break;
    }
}

/*
 * Handles events when a key is released.
 */
function onKeyUp(event)
{
    var key = String.fromCharCode(event.keyCode);

    switch (key) {
        // Both A and D control horizontal movement.
        case 'A':
        case 'D':
			playerCollider.velocity = new Vector2(0, playerCollider.velocity.y);
            break;
		case 'W':
			//Stop Jumping
			break;

        default:
            break;
    }
}