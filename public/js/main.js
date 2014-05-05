var gameOfLife = angular.module('gameOfLife', ['ngRoute', 'ngResource', 'ngAnimate']);

gameOfLife.config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.
			when('/', {
				templateUrl: 'tpl/home.html',
				controller: 'HomeCtrl'
			}).
			when('/about', {
				templateUrl: 'tpl/about.html',
			}).			
			otherwise({
				redirectTo: '/'
			})

}]);

gameOfLife.controller('HomeCtrl', ['$scope', '$http', '$interval', 'SavedBoards',
	function($scope, $http, $interval, SavedBoards){
		
		$scope.form = {iterations: 0}

		// load saved boards from backend server
		SavedBoards.query({}, function(response){
			$scope.savedBoards = response
		});

		// give dimensions to create a new blank grid object,
		// or pass in a multidim. array of values to load
		// pass refreshVals to update existing scope grid w/ inputArray
		$scope.generateGrid = function(dimensions, inputArray, refreshVals) {
			// reset generation count if dimensions for new grid, or inputArray w/o refresh=true
			if (dimensions||(inputArray&&!refreshVals)) {  $scope.form.iterations = 0  }
			var newGrid = [];
			// use inputArray's dimensions if it was given
			dimensions = (inputArray) ? {x: inputArray[0].length, y: inputArray.length} : dimensions
			// all rows and cells
			for (var y =0; y < dimensions.y; y++) {
				var row = {index: y, cells:[]}	
				for (var x =0; x < dimensions.x; x++) {
					// get the val. from inputArray if it exists
					var val = (inputArray) ? inputArray[y][x] : 0;
					if (refreshVals) { // if refresh
						// replace existing grid val w/ this val
						$scope.grid[y].cells[x].val = val;
					} else {
						row.cells.push({index: x, val: val});
					}
				}
				newGrid[y]=row  
			}
			// update scope w/ new grid
			if (!refreshVals) {  $scope.grid = newGrid  }
		}

		// when user clicks the cell, change its value
		$scope.clickCell= function(x,y) {
			// note: y val is outer array index in multidim. array
			$scope.grid[y].cells[x].val = ($scope.grid[y].cells[x].val === 0) ? 1 : 0
		}

		// restart timer if running, otherwise cancel it
		$scope.startGame = function() {
			if ($scope.gameInterval) {
				$interval.cancel($scope.gameInterval)
				$scope.gameInterval = undefined // cancel timer
			} else {
				$scope.gameInterval = $interval(getNextState,$scope.form.delay||500)
			}
		}

		// convert from data object to multidim. array
		function convertGridObjToArray(gridObject) {
			var gridArray = []
			gridObject.forEach(function(row){
				newRow = []
				row.cells.forEach(function(cell){
					newRow.push(cell.val)
				})
				gridArray.push(newRow)
			})
			return gridArray
		}

		// retrieve the next state of grid from backend server
		// after coverting from an object to array of arrays
		function getNextState(){
			var arr = convertGridObjToArray($scope.grid)
			return $http.post('/gameoflife/getnextstate', arr).
				then(function(response){
					$scope.generateGrid(null, response.data, true)
					$scope.form.iterations += 1
				})
		}

}]);

gameOfLife.factory('SavedBoards', ['$resource', 
	function ($resource) {
		return $resource('/gameoflife/boards', {boardId: '@boardId'}, {
			query: {
				method:'GET', isArray: true
			}
		});
	}
]);