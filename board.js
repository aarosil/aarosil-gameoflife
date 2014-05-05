/** Rules of the Board 
    Any live cell with fewer than two live neighbours dies, as if caused by under-population.
    Any live cell with two or three live neighbours lives on to the next generation.
    Any live cell with more than three live neighbours dies, as if by overcrowding.
    Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
    0 represents a dead cell, 1 represents an alive cell
*/

function Board(cellArray) {
	this.width = cellArray[0].length
	this.height = cellArray.length
	this.cells = cellArray	
}	

// return the next state of the board, given the current state
Board.prototype.getNextState = function() {
	var nextState = []
	var nextCellState
	// go through all the rows 
	for (y = 0; y < this.height; y++ ) {
		var newRow = []
		// each cell
		for (x = 0; x < this.width; x++ ) {
			// note: y val is outer array index in multidim. array
			var currentlyAlive = this.cells[y][x]
			var population = this.countLivingNeighbors(x,y)
			if (currentlyAlive) {
				nextCellState = (population > 3 || population < 2) ? 0 : 1
			} else { 
				nextCellState = (population === 3) ? 1 : 0
			}
			newRow.push(nextCellState)
		}
		nextState.push(newRow)
	}
	return nextState
}

// return the neighbor cells that don't exceed 
// dimensions of the game board.
Board.prototype.getNeighborCells = function(x,y) {
	var h = this.height
	var w = this.width
	// calculate all potential neighbors clockwise starting in top left
	// origin (0,0) is top left of grid
	var potentialNeighbors = [
		{	x: x-1, 	y: y-1 	}, // above left 
		{	x: x,		y: y-1	}, // above 
		{	x: x+1,		y: y-1	}, // above right
		{	x: x+1,		y: y	}, // right
		{	x: x+1,		y: y+1	}, // below right
		{	x: x,		y: y+1	}, // below 
		{	x: x-1,		y: y+1	}, // below left
		{	x: x-1,		y: y	}];// left 

	// filter out neighbors that exceed board dimensions
	return potentialNeighbors.filter(function(cell){
		return (cell.x < w) && (cell.x >= 0) && (cell.y < h) && (cell.y >= 0)
	});
}

// get valid neighbor cells then sum their values
Board.prototype.countLivingNeighbors = function(x,y) {
	var cells = this.cells;
	var neighbors = this.getNeighborCells(x,y)
	// note: y val is outer array index in multidim. array
	return neighbors.reduce(function(a, b){return a + cells[b.y][b.x]},0)
}

module.exports = Board