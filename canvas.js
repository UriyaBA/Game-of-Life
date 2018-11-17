/* 

Bugs
- Edge cells might be misbehaving

TODO
- Make algorithms more efficient
- Clean up various code bits
- Add more user inputs / info
- Add more analytics
- Make UI prettier

*/

function animate() {

	requestAnimationFrame(animate);
	c.clearRect(0, 0, innerWidth, innerHeight);

	updateDOM();

	if (simulate)
		board.update();

	board.draw();

}

function updateDOM() {

		living = board.livingCells();

		document.getElementById("generationheader").innerHTML = "Generation " + board.generation;
		document.getElementById("livingcells").innerHTML = "Living Cells: " + living + " (" + (living)/(BOARD_ROWS*BOARD_ROWS) + "% of total cells)";

}

function addListeners(){
	
	canvas.addEventListener('click', function (event) {

		mouseX = event.clientX;
		mouseY = event.clientY;
		
		for (var i=0; i<BOARD_ROWS; i++)			
				for(var j=0; j<BOARD_COLS; j++)
					if (board.cellArray[i][j].checkCollisionWithMouse(mouseX, mouseY)){
						board.cellArray[i][j].toggleState();
						return;
					}
						

	});
	
};

function toggleSimulation(){
	simulate = !simulate;
}

// Initialization
var canvas = document.querySelector('canvas');
var drawingMode = false;
canvas.width = 1000;
canvas.height = 1000;

addListeners();

var c = canvas.getContext('2d');

var BOARD_ROWS = 100, BOARD_COLS = 100;

var board = new GameBoard(BOARD_ROWS, BOARD_COLS);
var simulate = false;

animate();