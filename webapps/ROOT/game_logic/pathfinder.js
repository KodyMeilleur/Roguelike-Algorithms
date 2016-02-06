
var myMaze = new maze(10);

var VERTHERU = 2;
var HORIHERU = 1;

//myMaze.init();

function findPath(startCell, endCell, maze){
	this.maze = maze;
	var openList = [],
	closedList = [],
	currentCell = startCell,
	observingCell,foundGoal = false,
	eCellHeur = (endCell.x + endCell.y);

	startCell.visited = true;
	startCell.heur = (VERTHERU + (eCellHeur - Math.abs(startCell.x + startCell.y)));
	openList.push(startCell);

	var searchHeur = function(){

		var smallestCell = openList[0],
		index = 0;
		for(var i = 0; i < openList.length; i++){
			if (openList[i].heur < smallestCell.heur){
				smallestCell = openList[i];
				index = i;
			}
		}
		closedList.push(smallestCell);
		//openList[index] = null;
		openList.splice(index,1);

		console.log('moving to:' + smallestCell.x + ',' + smallestCell.y);

		if(smallestCell.x == endCell.x && smallestCell.y == endCell.y){
			foundGoal = true;
			console.log('PaTH FOUND');
		}

		return smallestCell;
	}

	while(openList.length > 0 && foundGoal == false){
		currentCell = searchHeur();
		if(foundGoal == true){
			break;
		}

		observingCell = maze.room[currentCell.x - 1];
		if(observingCell && observingCell[currentCell.y]){  // if a north row exists...
			if(observingCell[currentCell.y].visited == false
				&& observingCell[currentCell.y].wall == false){ // and it hasnt been visited or a wall

				// reference the specific cell
				observingCell = observingCell[currentCell.y];

				// calculate its weight towards the goal
				observingCell.heur = (VERTHERU + (eCellHeur - Math.abs(observingCell.x + observingCell.y)));
				observingCell.visited = true;

				// set parent cell and add to potential list of nodes
				observingCell.parentCell = currentCell;
				openList.push(observingCell);

			}

		}
		observingCell = maze.room[currentCell.x][currentCell.y + 1];
		if(observingCell){  // if a cell exists...
			if(observingCell.visited == false
					&& observingCell.wall == false){ // and it hasnt been visited
					observingCell.heur = (HORIHERU + (eCellHeur - Math.abs(observingCell.x + observingCell.y)));
					observingCell.visited = true;
					observingCell.parentCell = currentCell;
					openList.push(observingCell);
			}

		}
		observingCell = maze.room[currentCell.x + 1];
		if(observingCell && observingCell[currentCell.y]){
			if(observingCell[currentCell.y].visited == false
					&& observingCell[currentCell.y].wall == false){
					observingCell = observingCell[currentCell.y];
					observingCell.heur = (VERTHERU + (eCellHeur - Math.abs(observingCell.x + observingCell.y)));
					observingCell.visited = true;
					observingCell.parentCell = currentCell;
					openList.push(observingCell);
			}

		}
		observingCell = maze.room[currentCell.x][currentCell.y - 1];
		if(observingCell){
			if(observingCell.visited == false
					&& observingCell.wall == false){
					observingCell.heur = (HORIHERU + (eCellHeur - Math.abs(observingCell.x + observingCell.y)));
					observingCell.visited = true;
					observingCell.parentCell = currentCell;
					openList.push(observingCell);
			}

		}

	}
	if(foundGoal == false){
		console.log('no path')
		return [];
	}
	else{
		var finalPath = [],
		tracePath = closedList.pop();
		finalPath.push(tracePath);
		do {
			var nextCell = tracePath.parentCell;
			finalPath.push(nextCell);
			tracePath = nextCell;
		}
		while(tracePath.parentCell);
		return finalPath.reverse();
	}

}

/* temp walls
myMaze.room[0][5].wall = true;
myMaze.room[1][5].wall = true;
myMaze.room[2][5].wall = true;
myMaze.room[3][5].wall = true;
myMaze.room[3][4].wall = true;
myMaze.room[3][3].wall = true;
myMaze.room[3][2].wall = true;
*/
function genRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}
function BUILDTHEWALL(walls){
	var seed = myMaze.room.length - 1;
	for(var i = 0; i < walls; i++){
		myMaze.room[genRandomNumber(0,seed)][genRandomNumber(0,seed)].wall = true;
	}

}
BUILDTHEWALL(10);

// Testing function
var myPath = findPath(myMaze.room[1][0],myMaze.room[9][9],myMaze); //TODO: pass copy of maze

(function(){
	console.log(myMaze.room.length);
	for( var i = 0; i < myMaze.room.length; i++){
		for( var k = 0; k < myMaze.room[i].length; k++){
			var color;
			if(testPath(myPath,myMaze.room[i][k])){
				color = 'yellow';
			}
			else if(myMaze.room[i][k].wall == true){
				color = 'blue';
			}
			else
				myMaze.room[i][k].visited ? color = '#ff0000': color = 'white';

			$('#myHeader').append('<div style="border:1px black solid;border-radius:5px;display:inline-block;width:32px;height:32px;background-color:' + color + ';"</div>');
		}
		$('#myHeader').append('<br>');
	}
})();

function testPath(path,cell){
	for(var i = 0; i < path.length; i ++){
		if(cell.x == path[i].x && cell.y == path[i].y)
			return true;
	}
}

console.log(myMaze);
