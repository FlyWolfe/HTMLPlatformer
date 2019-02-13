var lastFrameTime; // Time of the last frame

var playerImg;
var playerCollider;
var player;

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
	
	// Create the player image
	playerImg = new Image();
	playerImg.src = 'sprites/TurtleDown.png';
	
	// Initialize the tilemap
	tilemap = new Tilemap("tilemap/tilemap.txt", canvas, context, "#6B8CFF", 32);
	
	// Create the player
	player = new Player(playerImg, tilemap);
	
	// Get the current time and set up lastFrameTime for delta time calculation
	lastFrameTime = Date.now();
	
	// Set up Key Presses
	document.onkeydown = onKeyDown;
    document.onkeyup = onKeyUp;
	
	// For calculating camera movement based on player movement delta
	prevPlayerPos = player.collider.position;
	
	
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
	
	player.update(dt);
	
	/*if (player.collider.checkCollision(floor) == "BOTTOM")
	{
		player.collider.velocity = new Vector2(player.collider.velocity.x, 0);
		player.collider.position = new Vector2(player.collider.position.x, floor.position.y - player.collider.height);
		isGrounded = true;
	}*/
	
	/*for (let i = 0; i < tilemap.map.length; i ++) {
		for(let j = 0; j < tilemap.map[i].length; j ++) {
			if (player.collider.checkCollision(tilemap.collider[i][j]) == "Bottom")
			{
				player.collider.velocity = new Vector2(player.collider.velocity.x, 0);
				player.collider.position = new Vector2(player.collider.position.x, tilemap.collider[i][j].position.y - player.collider.height);
				isGrounded = true;
				console.log("Bottom");
			}
		}
	}*/
	context.setTransform();
	context.translate(-player.collider.position.x + 250, -player.collider.position.y + 250);
	
	prevPlayerPos = player.collider.position;
	
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
	context.clearRect(player.collider.position.x - 250, player.collider.position.y - 250, canvas.width * 2, canvas.height * 2);
	tilemap.draw(player.collider.position.x - 250, player.collider.position.y - 250, canvas.width * 2, canvas.height * 2);
	player.draw(canvas, context);
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
			if (player.collider.velocity.x > -3)
			{
				player.collider.velocity = player.collider.velocity.add(new Vector2(-3, 0));
			}
            break;

        case 'D':
            //Move Right
			if (player.collider.velocity.x < 3)
			{
				player.collider.velocity = player.collider.velocity.add(new Vector2(3, 0));
			}
            break;

		case 'W':
			//Jump
			if (isGrounded)
			{
				player.collider.velocity = new Vector2(player.collider.velocity.x, -20);
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
			player.collider.velocity = new Vector2(0, player.collider.velocity.y);
            break;
		case 'W':
			//Stop Jumping
			break;

        default:
            break;
    }
}