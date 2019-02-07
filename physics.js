// Contains x and y values for points, vectors, and velocity
class Vector2
{
	constructor(x, y)
	{
		this.x = x;
		this.y = y;
	}
	
	// Vector2 + Vector2
	add(other)
	{
		var temp = new Vector2(this.x, this.y);
		temp.x += other.x;
		temp.y += other.y;
		return temp;
	}
	
	// Vector2 * Float
	multiply(other)
	{
		var temp = new Vector2(this.x, this.y);
		temp.x *= other;
		temp.y *= other;
		return temp;
	}
	
	// Vector2 - Vector2
	subtract(other)
	{
		var temp = new Vector2(this.x, this.y);
		temp.x -= other.x;
		temp.y -= other.y;
		return temp;
	}
	
	// Vector2 / Float
	divide(other)
	{
		var temp = new Vector2(this.x, this.y);
		temp.x /= other;
		temp.y /= other;
		return temp;
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
		var thisBottom = this.position.y + this.height;
		var thisRight = this.position.x + this.width;
		var otherBottom = other.position.y + other.height;
		var otherRight = other.position.x + other.width;
		
		var topCollision = otherBottom - this.position.y;
		var bottomCollision = thisBottom - other.position.y;
		var leftCollision = otherRight - this.position.x;
		var rightCollision = thisRight = other.position.x;
		
		if (this.position.x - this.width < other.position.x + other.width && this.position.x + this.width > other.position.x &&
			this.position.y - this.height < other.position.y + other.height && this.position.y + this.height > other.position.y)
		{
			if (topCollision < bottomCollision && topCollision < leftCollision && topCollision < rightCollision)
			{
				return "TOP";
			}
			else if (bottomCollision < topCollision && bottomCollision < leftCollision && bottomCollision < rightCollision)
			{
				return "BOTTOM";
			}
			else if (leftCollision < topCollision && leftCollision < bottomCollision && leftCollision < rightCollision)
			{
				return "LEFT";
			}
			else if (rightCollision < topCollision && rightCollision < leftCollision && rightCollision < bottomCollision)
			{
				return "RIGHT";
			}
			else
			{
				return "NONE";
			}
		}
		else
		{
			return "NONE";
		}
	}
	
	// Apply gravity to the object and make it move down in the y direction
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
		var tempVel = this.velocity.multiply(time);
		this.position = this.position.add(tempVel); // get our velocity multiplied by the time since last frame and add to our position
	}
}