var specialWidth = Math.round((window.innerWidth - 34) / 34);
var myMaze = new maze(10,specialWidth);

var VERTHERU = 1;
var HORIHERU = 1;

//myMaze.init();

function findPath(startCell, endCell, maze){
	this.maze = maze;
	var openList = [],
	closedList = [],
	currentCell = startCell,
	observingCell,foundGoal = false,
	endCellHeur = (endCell.x + endCell.y);

	startCell.visited = true;
	startCell.heur = (VERTHERU + (endCellHeur - Math.abs(startCell.x + startCell.y)));
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
		openList.splice(index,1);

		console.log('moving to ' + smallestCell.x + ',' + smallestCell.y)

		if(smallestCell.x == endCell.x && smallestCell.y == endCell.y){
			foundGoal = true;
			console.log('PaTH FOUND');
		}

		return smallestCell;
	}


	var processCell = function(cell,heur){
		cell.heur = (heur + (Math.abs(endCell.x - cell.x)) + Math.abs(endCell.y - cell.y));
		cell.visited = true;
		cell.parentCell = currentCell;
		openList.push(cell);
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
				processCell(observingCell[currentCell.y],VERTHERU);

			}

		}
		observingCell = maze.room[currentCell.x][currentCell.y + 1]; // looks east
		if(observingCell){  // if a cell exists...
			if(observingCell.visited == false
					&& observingCell.wall == false){ // and it hasnt been visited
					processCell(observingCell,HORIHERU);
			}

		}
		observingCell = maze.room[currentCell.x + 1];
		if(observingCell && observingCell[currentCell.y]){
			if(observingCell[currentCell.y].visited == false
					&& observingCell[currentCell.y].wall == false){
						processCell(observingCell[currentCell.y],VERTHERU);
			}

		}
		observingCell = maze.room[currentCell.x][currentCell.y - 1];
		if(observingCell){
			if(observingCell.visited == false
					&& observingCell.wall == false){
					processCell(observingCell,HORIHERU);
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


function genRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function BUILDTHEWALL(walls){
	var seed = myMaze.room.length - 1;
	for(var i = 0; i < walls; i++){
		myMaze.room[genRandomNumber(0,seed)][genRandomNumber(0,specialWidth - 1)].wall = true;
	}

}

BUILDTHEWALL(30);

// Testing function
var myPath = findPath(myMaze.room[genRandomNumber(0, 9)][genRandomNumber(0, specialWidth - 1)],myMaze.room[genRandomNumber(0, 9)][genRandomNumber(0, specialWidth - 1)],myMaze); //TODO: pass copy of maze

(function(){
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

			$(' #myHeader').append('<div style="border:1px black solid;border-radius:5px;display:inline-block;width:32px;height:32px;background-color:' + color + ';">'+ myMaze.room[i][k].heur +'</div>');
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
