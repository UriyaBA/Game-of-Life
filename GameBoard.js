class GameBoard {
	
	constructor(rows, cols){
		
		var cellWidth = canvas.width / rows;
		var gridColor = 'gray';
		
		this.cellArray = [];
		this.generation = 0;
		
		for (var i=0; i<rows; i++){
			
			let r = [];
			
			for(var j=0; j<cols; j++){
				r.push(new Cell(i*cellWidth, j*cellWidth, cellWidth, i, j));
			}
			
			this.cellArray.push(r);
			
		}

		this.livingNeighbors = function(cell){

			var neighbors = 0;

			if (cell.i > 0 && cell.j > 0 && cell.j < cols-1){
				if (this.cellArray[cell.i-1][cell.j-1].alive)
					neighbors++;
				if (this.cellArray[cell.i-1][cell.j].alive)
					neighbors++;
				if (this.cellArray[cell.i-1][cell.j+1].alive)
					neighbors++;
			}

			if (cell.j > 0 && cell.j < cols-1){
				if (this.cellArray[cell.i][cell.j-1].alive)
					neighbors++;
				if (this.cellArray[cell.i][cell.j+1].alive)
					neighbors++;
			}

			if (cell.i < rows-1 && cell.j > 0 && cell.j < cols-1){
				if (this.cellArray[cell.i+1][cell.j-1].alive)
					neighbors++;
				if (this.cellArray[cell.i+1][cell.j].alive)
					neighbors++;
				if (this.cellArray[cell.i+1][cell.j+1].alive)
					neighbors++;
			}

				return neighbors;

		};

		this.livingCells = function(){

			let living = 0;

			for (var i=0; i<rows; i++)
				for(var j=0; j<cols; j++)
					if (this.cellArray[i][j].alive)
						living += 1;
			
			return living;

		}

		// Calculating expected generation's cells' state
		this.prepareNextGen = function(){

			for (var i=0; i<rows; i++){	
				for (var j=0; j<cols; j++){

					var currentCell = this.cellArray[i][j];
					var currentNeighbors = this.livingNeighbors(currentCell);

					if ( (!currentCell.alive && currentNeighbors == 3) || (currentCell.alive && (currentNeighbors == 2 || currentNeighbors == 3)) )
						currentCell.nextAlive = true;

					else if ( currentCell.alive && (currentNeighbors < 2 || currentNeighbors > 3) )
						currentCell.nextAlive = false;

				}
			}

		};

		this.reset = function() {

			this.generation = 0;

			for (var i=0; i<rows; i++)			
				for(var j=0; j<cols; j++)
					this.cellArray[i][j].kill();

		};

		this.randomise = function() {

			this.generation = 0;

			for (var i=0; i<rows; i++){		

				for(var j=0; j<cols; j++){

					let r = Math.round((Math.random()));
					let cell = this.cellArray[i][j];

					if (r == 1)
						cell.revive();
					else
						cell.kill();


				}
			}		

		};

		this.update = function() {

			this.generation += 1;

			this.prepareNextGen();

			for (var i=0; i<rows; i++)
				for (var j=0; j<cols; j++)
					this.cellArray[i][j].nextGen();

		};
		
		this.drawBoard = function(){
			
			for (var i=0; i<rows; i++){
				
				c.strokeStyle = gridColor;
				c.beginPath();
				c.moveTo(i * cellWidth, 0);
				c.lineTo(i * cellWidth, canvas.height);
				c.stroke();
				
				for(var j=0; j<cols; j++){
					
					c.strokeStyle = gridColor;
					c.beginPath();
					c.moveTo(0, j * cellWidth);
					c.lineTo(canvas.width, j * cellWidth);
					c.stroke();
					
				}
				
			}
			
		};
		
		this.drawCells = function(){
			
			for (var i=0; i<rows; i++)			
				for(var j=0; j<cols; j++)
					this.cellArray[i][j].draw();
					
		};
		
		this.draw = function(){
			
			this.drawCells();
			this.drawBoard();
	
		};

	}

}