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

		$scope.generateGrid = function(dimensions) {
			$scope.grid = []
			$scope.gameInterval = undefined
			// create data format for ease of ng-repeat
			for (var i =0; i < dimensions; i++) {
				var row = {row: i, cells:{}}	
				for (var j =0; j < dimensions; j++) {
					row.cells[j] = 0
				}
				$scope.grid[i]=row
			}
		}

		// when user clicks the cell change it values
		$scope.clickCell= function(x,y) {
			// note: y val is outer array index in multidim. array
			$scope.grid[y].cells[x] = ($scope.grid[y].cells[x] === 1) ? 0 : 1
		}

		 
		$scope.startGame = function() {
			if ($scope.gameInterval) {
				$interval.cancel($scope.gameInterval)
				$scope.gameInterval = undefined
			} else {
				$scope.gameInterval = $interval(getNextState,$scope.form.delay||500)
			}
		}

		// change from multidimensional array to ng-repeat data ojb.
		function convertArrayToGridObj(gridArr){
			var gridObj = []
			for (var i =0; i < gridArr.length; i++) {
				var row = {row: i, cells:{}}	
				for (var j =0; j < gridArr[0].length; j++) {
					row.cells[j] = gridArr[i][j]
				}
				gridObj[i]=row
			}
			return gridObj
		}

		// change from the data object easy for ng-repeat to multidim. array
		function convertGridObjToArray(gridObject) {
			var gridArray = []
			gridObject.forEach(function(row){
				r = []
				Object.keys(row.cells).forEach(function(cell){
					r.push(row.cells[cell])
				})
				gridArray.push(r)
			})
			return gridArray
		}

		// retrieve the next state of grid from backend server
		function getNextState(){
			var gridArray = convertGridObjToArray($scope.grid)
			return $http.post('/gameoflife/getnextstate', gridArray).
				then(function(response){
					var newGridObj = convertArrayToGridObj(response.data)
					$scope.grid = newGridObj
				})
		}


}]);