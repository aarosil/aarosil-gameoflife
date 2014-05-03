var Board = require('./board')

var testGrid = [

[0,1,0,0,0,0,0,0,0,1],
[1,1,0,0,0,0,0,0,1,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,1,0,0,0,1,1],
[1,1,0,1,1,1,1,1,0,0],
[0,0,0,1,0,1,0,1,1,1],
[0,0,0,1,1,1,1,1,0,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,1,1,1,0,0,1],
[0,0,0,0,1,1,1,0,1,0],

]

var block = [
	[0,0,0,0],
	[0,1,1,0],
	[0,1,1,0],
	[0,0,0,0],
]

var beacon = [
	[0,0,0,0,0,0],
	[0,1,1,0,0,0],
	[0,1,1,0,0,0],
	[0,0,0,1,1,0],
	[0,0,0,1,1,0],
	[0,0,0,0,0,0],
]

var board = new Board(testGrid);

describe('Game Of Life board - test all 8 condition of cell location', function () {


	it('upper left corner cell should have 3 alive neighbors', function(){
		expect(board.countLivingNeighbors(0,0)).toBe(3)	
	})

	it('left column 4th row should have 1 alive neighbor', function(){
		expect(board.countLivingNeighbors(0,4)).toBe(1)	
	})

	it('lower left corner cell should have 0 alive neighbors', function(){
		expect(board.countLivingNeighbors(0,9)).toBe(0)	
	})

	it('bottom row 5th column should have 5 alive neighbors', function(){
		expect(board.countLivingNeighbors(5,9)).toBe(5)	
	})

	it('lower right corner cell should hav 2 alive neighbors', function(){
		expect(board.countLivingNeighbors(9,9)).toBe(2)
	})

	it('right column 4th row should have 4 alive neighbors', function(){
		expect(board.countLivingNeighbors(9,4)).toBe(4)
	})

	it('top right corner should have 1 alive neighbors', function() {
		expect(board.countLivingNeighbors(9,0)).toBe(1)
	})

	it('cell (4,5) should have 8 alive neighbors', function(){
		expect(board.countLivingNeighbors(4,5)).toBe(8)
	})

})