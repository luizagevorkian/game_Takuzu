function GridCreate(size,px) {
  this.gridSize = size;
  this.px = px;
  this.data = [];



  //set equal size to rols and cols
  for (let row = 0; row < this.gridSize; row++) {
    this.data[row] = [];
    for (let col = 0; col < this.gridSize; col++) {
      this.data[row][col] = new Cell(-1, row, col, false);
    }
  }
  
  this.setGrid = function(grid) {
    this.data = [];
    let idx = 0;
    for (let row = 0; row < this.gridSize; row++) {
      this.data[row] = [];
      for (let col = 0; col < this.gridSize; col++) {
        this.data[row][col] = grid ?
          new Cell(grid[idx], row, col, grid[idx] != -1) :
          new Cell(-1, row, col, false);
        idx++;
      }
    }
  };
  
  this.getCell = function (row, col) {
    return this.data[row][col];
  };
//use embedded functions to design and color grid
  this.draw = function () {
    fill(255, 255, 255, 255);
    rect(0, 0, this.gridSize*this.px, this.gridSize*this.px);
    textSize(16);
    stroke(0);
    strokeWeight(1);
    for (let row = 0; row < this.gridSize; row++) {
      for (let col = 0; col < this.gridSize; col++) {
        let cell = this.getCell(row, col);
        fill(
          cell.getColors().backColor.R,
          cell.getColors().backColor.G,
          cell.getColors().backColor.B
          );
        rect(col * this.px, row * this.px, this.px, this.px);
        fill(
          cell.getColors().foreColor.R,
          cell.getColors().foreColor.G,
          cell.getColors().foreColor.B
          );
        if(cell.getValue() != -1) {
          text(cell.getValue(), col * this.px + 1, row * this.px + 1, this.px, this.px);
        }
      } 
    }
  };

  //The function is used to debug and display the current state of the game board on the console
  this.toString = function() {
    let str = '';
    for (let row = 0; row < this.gridSize; row++) {
      for (let col = 0; col < this.gridSize; col++) {
        str += this.getCell(row, col).getValue() + ' | ';
      }
      str += '\n';
    }
    str += '\n';
    return str;
  }
}
