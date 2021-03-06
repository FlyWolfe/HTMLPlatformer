class Tilemap
{
	constructor(file, canvas, context, backgroundColor, size)
	{
		this.file = file;
		this.canvas = canvas;
		this.context = context;
		this.backgroundColor = backgroundColor;
		this.size = size;
		
		this.map = new Array();
			this.map.push(['00','00','00','00','00','00','00','00','00','00','00','00','00','00','00','00']);
			this.map.push(['00','00','00','00','00','00','00','00','00','00','00','00','00','00','00','00']);
			this.map.push(['00','00','00','00','00','00','00','00','00','00','00','00','00','00','00','00']);
			this.map.push(['00','00','00','00','00','00','00','00','00','00','00','00','00','00','00','00']);
			this.map.push(['00','00','00','00','00','00','00','00','00','00','00','00','00','00','00','00']);
			this.map.push(['00','00','00','00','00','00','00','00','00','00','00','00','00','00','00','00']);
			this.map.push(['00','00','00','00','00','00','00','00','00','00','00','00','00','00','00','00']);
			this.map.push(['00','00','00','00','00','00','00','00','00','00','00','00','00','00','00','00']);
			this.map.push(['00','00','00','00','00','00','00','00','00','00','00','00','00','00','00','00']);
			this.map.push(['00','00','00','00','00','00','00','00','00','00','00','00','14','15','00','00']);
			this.map.push(['00','00','00','00','00','00','00','00','00','00','00','00','13','16','00','00']);
			this.map.push(['00','00','00','00','08','09','10','11','12','00','00','00','13','16','00','00']);
			this.map.push(['03','03','03','03','03','03','03','03','03','03','03','03','03','03','03','03']);
			this.map.push(['03','03','03','03','03','03','03','03','03','03','03','03','03','03','03','03']);

		this.collider = new Array();
			this.collider.push(['00','00','00','00','00','00','00','00','00','00','00','00','00','00','00','00']);
			this.collider.push(['00','00','00','00','00','00','00','00','00','00','00','00','00','00','00','00']);
			this.collider.push(['00','00','00','00','00','00','00','00','00','00','00','00','00','00','00','00']);
			this.collider.push(['00','00','00','00','00','00','00','00','00','00','00','00','00','00','00','00']);
			this.collider.push(['00','00','00','00','00','00','00','00','00','00','00','00','00','00','00','00']);
			this.collider.push(['00','00','00','00','00','00','00','00','00','00','00','00','00','00','00','00']);
			this.collider.push(['00','00','00','00','00','00','00','00','00','00','00','00','00','00','00','00']);
			this.collider.push(['00','00','00','00','00','00','00','00','00','00','00','00','00','00','00','00']);
			this.collider.push(['00','00','00','00','00','00','00','00','00','00','00','00','00','00','00','00']);
			this.collider.push(['00','00','00','00','00','00','00','00','00','00','00','00','01','01','00','00']);
			this.collider.push(['00','00','00','00','00','00','00','00','00','00','00','00','01','01','00','00']);
			this.collider.push(['00','00','00','00','00','00','00','00','00','00','00','00','01','01','00','00']);
			this.collider.push(['01','01','01','01','01','01','01','01','01','01','01','01','01','01','01','01']);
			this.collider.push(['01','01','01','01','01','01','01','01','01','01','01','01','01','01','01','01']);
			
		for (let i = 0; i < this.map.length; i ++) {
			for(let j = 0; j < this.map[i].length; j ++) {
				this.collider[i][j] =  new Collider(new Vector2(j * size, i * size), size, size, 0, 0);
			}
		}
		
		this.iscollider = new Array();
			this.iscollider.push(['00','00','00','00','00','00','00','00','00','00','00','00','00','00','00','00']);
			this.iscollider.push(['00','00','00','00','00','00','00','00','00','00','00','00','00','00','00','00']);
			this.iscollider.push(['00','00','00','00','00','00','00','00','00','00','00','00','00','00','00','00']);
			this.iscollider.push(['00','00','00','00','00','00','00','00','00','00','00','00','00','00','00','00']);
			this.iscollider.push(['00','00','00','00','00','00','00','00','00','00','00','00','00','00','00','00']);
			this.iscollider.push(['00','00','00','00','00','00','00','00','00','00','00','00','00','00','00','00']);
			this.iscollider.push(['00','00','00','00','00','00','00','00','00','00','00','00','00','00','00','00']);
			this.iscollider.push(['00','00','00','00','00','00','00','00','00','00','00','00','00','00','00','00']);
			this.iscollider.push(['00','00','00','00','00','00','00','00','00','00','00','00','00','00','00','00']);
			this.iscollider.push(['00','00','00','00','00','00','00','00','00','00','00','00','01','01','00','00']);
			this.iscollider.push(['00','00','00','00','00','00','00','00','00','00','00','00','01','01','00','00']);
			this.iscollider.push(['00','00','00','00','00','00','00','00','00','00','00','00','01','01','00','00']);
			this.iscollider.push(['01','01','01','01','01','01','01','01','01','01','01','01','01','01','01','01']);
			this.iscollider.push(['01','01','01','01','01','01','01','01','01','01','01','01','01','01','01','01']);
			
		// just keeps the canvas element sized appropriately
		this.resize = function(event) {
			context.canvas.width = Math.floor(document.documentElement.clientWidth - 32);

			if (context.canvas.width > document.documentElement.clientHeight) {

			  context.canvas.width = Math.floor(document.documentElement.clientHeight);

			}

			context.canvas.height = Math.floor(context.canvas.width * 0.5625);

			//draw();
		};

		window.addEventListener("resize", this.resize, {passive:true});
		
	}
	
	draw(x, y, width, height)
	{
		//DRAW THE BACKGROUND FOR THE TILEMAP
		context.rect(x, y, width, height);
		context.fillStyle = this.backgroundColor;
		context.fill();
		  
		for (let i = 0; i < this.map.length; i ++) {
			for(let j = 0; j < this.map[i].length; j ++) {
				var tile = 'tilemap/tile' + this.map[i][j] + ".png";
			
				//DRAW TILES 
				var tileImg = new Image();
				tileImg.src = tile;
				context.drawImage(tileImg, j * this.size, i * this.size, this.size, this.size);
			}
		}

	}
}