var gameOfLife = angular.module('gameOfLife', ['ngRoute', 'ngResource']);

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

gameOfLife.controller('HomeCtrl', ['$scope', '$http', '$interval',
	function($scope, $http, $interval){
		
		$scope.form = {}

		// give dimensions to create a blank grid object
		// or pass in a multidim. array of values 
		$scope.generateGrid = function(dimensions, inputArray) {
			if (!dimensions && !inputArray) {  return  }
			$scope.grid = []
			// use input array for dimensions if it was given
			dimensions = (inputArray) ? {x: inputArray[0].length, y: inputArray.length} : dimensions

			for (var i =0; i < dimensions.y; i++) {
				var row = {row: i, cells:[]}	
				for (var j =0; j < dimensions.x; j++) {
					// get the val. from inputArray
					// otherwise create blank grid
					var val = (inputArray) ? inputArray[i][j] : 0
					row.cells.push({index: j, val: val}) 
				}
				$scope.grid[i]=row
			}
		}

		// when user clicks the cell, change its value
		$scope.clickCell= function(x,y) {
			// note: y val is outer array index in multidim. array
			$scope.grid[y].cells[x].val = ($scope.grid[y].cells[x].val === 0) ? 1 : 0
		}

		 
		$scope.startGame = function() {
			if ($scope.gameInterval) {
				$interval.cancel($scope.gameInterval)
				$scope.gameInterval = undefined // cancel timer
			} else {
				$scope.gameInterval = $interval(getNextState,$scope.form.delay||500)
			}
		}

		// convert from  data object to multidim. array
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
		function getNextState(){
			var arr = convertGridObjToArray($scope.grid)
			return $http.post('/gameoflife/getnextstate', arr).
				then(function(response){
					$scope.generateGrid(null, response.data)
				})
		}

}]);