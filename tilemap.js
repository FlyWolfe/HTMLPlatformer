class Tilemap
{
	constructor(file, canvas, context, backgroundColor, size)
	{
		this.file = file;
		this.canvas = canvas;
		this.context = context;
		this.backgroundColor = backgroundColor;
		this.size = size;
		
		this.map = this.readMapFile('./tilemap/map01.txt');

		this.collider = this.readMapFile('./tilemap/collider01.txt');
		this.iscollider = this.collider;
			
		for (let i = 0; i < this.map.length; i ++) {
			for(let j = 0; j < this.map[i].length; j ++) {
				this.collider[i][j] =  new Collider(new Vector2(j * size, i * size), size, size, 0, 0);
			}
		}
			
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
    
    readMapFile(file){
        var iframe = document.createElement('iframe');
        iframe.id = 'iframe';
        iframe.style.display = 'none';
        document.body.appendChild(iframe);
        iframe.src = file;


        var filetext = document.getElementById('iframe').contentDocument.body.firstChild.innerHTML;
        var map = new Array();

        var lineArray = filetext.split("\n"); 
        var i;
        for(i = 0; i < lineArray.length; i++){
           var elementArray = lineArray[i].split(" ");

           var j;
           for(j = 0; j < elementArray.length; j++){ 
               var elem = elementArray[j];
               if (elem) {
                    map.push("'" + elem + "'");
               }
           }       
        }
        return map;
    }
}