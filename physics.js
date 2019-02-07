// Contains x and y values for points, vectors, and velocity
class Vector2
{
	constructor(x, y)
	{
		this.x = x;
		this.y = y;
	}
	
	add(other)
	{
		this.x += other.x;
		this.y += other.y;
	}
	
	multiply(other)
	{
		this.x *= other;
		this.y *= other;
	}
	
	subtract(other)
	{
		this.x -= other.x;
		this.y -= other.y;
	}
	
	divide(other)
	{
		this.x /= other;
		this.y /= other;
	}
	
	set(x, y)
	{
		this.x = x;
		this.y = y;
	}
}

// Defines a collision box in world space. the point positions define the top-left part of the object (Or bottom-left... We need to determine world space)
class Collider {
    constructor(position, width, height, gravity)
	{
        this.position = position;
		this.width = width;
		this.height = height;
		this.gravity = gravity;
		this.velocity = new Vector2(0, 0);
    }
	
	// Move the collider some distance in x and y without respect to velocity
	translate(xDistance, yDistance)
	{
		this.position.x += xDistance;
		this.position.y += yDistance;
	}
	
	// Check if we are colliding with another Collider
	checkCollision(other)
	{
		if (this.position.x - this.width < other.position.x + other.width && this.position.x + this.width > other.position.x &&
			this.position.y - this.height < other.position.y + other.height && this.position.y + this.height > other.position.y)
		{
			return true;// We are colliding.
		}
	}
	
	// Apply gravity to the object and make it move down in the y direction. Need to implement velocity and apply that to the objects
	applyGravity(time)
	{
		this.velocity.y += this.gravity * time;
	}
	
	setGravity(gravity)
	{
		this.gravity = gravity;
	}
	
	update(time)
	{
		this.applyGravity(time);
		this.velocity.multiply(time);
		this.position.add(this.velocity); // get our velocity multiplied by the time since last frame and add to our position
	}
}