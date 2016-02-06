
function cell(x,y,visited,parentCell){

	//(x,y) loc
	this.x = x;
	this.y = y;

	// cell has been visited
	this.visited = visited;

	// cell moved to by
	this.parentCell = parentCell;
	this.wall = false;
	this.heur = 0;
	this.g = 0;
	this.h = 0;
}

function maze(rows,columns){
	this.rows = rows;
	this.columns = columns;
	this.room = [];
	this.init();
}

maze.prototype.init = function(){
	var rows = this.rows;
	var columns = this.columns;
	for( var i = 0; i < rows; i++){
		this.room[i] = (function(){
			var column = [];
			for( var k = 0; k < columns; k++){
				column[k] = new cell(i,k,false);
			}
			return column;
		})();
	}
}
