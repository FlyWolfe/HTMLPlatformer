class Tilemap
{
        

    
	constructor(file, canvas, context, backgroundColor, size)
	{
		this.file = file;
		this.canvas = canvas;
		this.context = context;
		this.backgroundColor = backgroundColor;
		this.size = size;
		
		this.map = this.readMapFile('map');

		this.iscollider = this.readMapFile('collider');
		this.collider = this.makeArray(this.iscollider[0].length, this.iscollider.length, "00");
		
		console.log(this.iscollider);
		
		for (let i = 0; i < this.iscollider.length; i ++) {
			for(let j = 0; j < this.iscollider[i].length; j ++) {
				//console.log(typeof this.iscollider[i][j]);
				
				/*if (typeof this.iscollider[i][j] == "string")
					console.log("J: " + j + " I: " + i + " Val: " + this.iscollider[i][j]);*/
				
				if (this.iscollider[i][j] == "01"){
					this.collider[i][j] = new Collider(new Vector2(j * size, i * size), size, size, 0, 0);
				}
			}
		}
		console.log(this.collider);
			
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
	
	makeArray(w, h, val) {
		var arr = [];
		for(var i = 0; i < h; i++) {
			arr[i] = [];
			for(var j = 0; j < w; j++) {
				arr[i][j] = val;
			}
		}
		return arr;
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
	
	readMapFile(name){
		
		var filetext = document.getElementById(name).contentDocument.body.firstChild.innerHTML;
		
		
		var map = new Array();
		
		var lineArray = filetext.split("\n"); 
		var i;
		for(i = 0; i < lineArray.length; i++){
		   var elementArray = lineArray[i].split(" ");
		   map.push([]);
			
		   var j;
		   for(j = 0; j < elementArray.length; j++){ 
			   var elem = elementArray[j].toString();
			   if (elem) {
					map[i].push(elem);
			   }
		   }       
		}
		
		return map;
	}

}