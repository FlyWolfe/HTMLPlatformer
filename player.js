class Player
{
	constructor(img, tilemap)
	{
		this.img = img;
		this.collider = new Collider(new Vector2(69, 50), 30, 30, 1, 9);
		this.tilemap = tilemap;
	}
	
	draw(canvas, context)
	{
		context.drawImage(this.img, this.collider.position.x, this.collider.position.y, this.collider.width, this.collider.height);
	}
	
	update(time)
	{
		for (let i = 0; i < tilemap.map.length; i ++) {
			for(let j = 0; j < tilemap.map[i].length; j ++) {
				if (tilemap.iscollider[i][j] != '00')
				{
					if (this.collider.checkCollision(tilemap.collider[i][j]).y == "BOTTOM")
					{
						this.collider.velocity = new Vector2(this.collider.velocity.x, 0);
						this.collider.position = new Vector2(this.collider.position.x, tilemap.collider[i][j].position.y - this.collider.height);
						isGrounded = true;
					}
					else if (this.collider.checkCollision(tilemap.collider[i][j]).y == "TOP")
					{
						this.collider.velocity = new Vector2(this.collider.velocity.x, 0);
						this.collider.position = new Vector2(this.collider.position.x, tilemap.collider[i][j].position.y + tilemap.collider[i][j].height);
					}
					if (this.collider.checkCollision(tilemap.collider[i][j]).x == "LEFT")
					{
						this.collider.velocity = new Vector2(0, this.collider.velocity.y);
						this.collider.position = new Vector2(tilemap.collider[i][j].position.x - this.collider.width, this.collider.position.y);
					}
					else if (this.collider.checkCollision(tilemap.collider[i][j]).x == "RIGHT")
					{
						console.log("Right");
						this.collider.velocity = new Vector2(0, this.collider.velocity.y);
						this.collider.position = new Vector2(tilemap.collider[i][j].position.x + tilemap.collider[i][j].width, this.collider.position.y);
					}
				}
			}
		}
		
		this.collider.update(time);
	}
}