function Takuzu(cellsPerLine, pxPerCell) {
  
  this.cellsPerLine = cellsPerLine;
  this.pxPerCell = pxPerCell;
  this.sizeGrid = this.cellsPerLine * this.pxPerCell;
  this.grid = new GridCreate(cellsPerLine, pxPerCell);
  this.constraintChecker = new CheckSequence();

  this.win = false;
  
  this.setGrid = function(grid) {
     if (grid instanceof GridCreate) {
      this.grid = grid;
    } else {
      this.grid.setGrid(grid);
    }
  }
  
  //check that all the rules have been followed
  this.drawGrid = function() {
    textAlign(CENTER, CENTER);
    this.grid.draw();
    if (this.win) {
      fill(50, 255, 50, 128);
      rect(0, 0, this.sizeGrid, this.sizeGrid);
      fill(220, 220, 220, 255);
      stroke(2);
      let output = 'You passed the game!';
      let fntSize = this.sizeGrid / this.cellsPerLine;
      textSize(fntSize);
      text(output, 0, 0, this.sizeGrid, this.sizeGrid);
    }
  }
  
  this.checkGrid = function () {
    this.win =  this.constraintChecker.check(this.grid);
  }
  
  this.getCellAt = function (x, y) {
    let row = Math.floor(y / this.pxPerCell);
    let col = Math.floor(x / this.pxPerCell);
    if (row < 0 || row > cellsPerLine || col < 0 || col > cellsPerLine) {
      return undefined;
    } else {
      return this.grid.getCell(row, col);
    }
  }
  
  this.changeCellValue = function(cell) {
    if (!cell.isFixed) {
      let cellValue = cell.getValue();
      cellValue += 2;
      cellValue = cellValue%3;
      cellValue -= 1;
      cell.setValue(cell.fixed ? cell.getValue() : cellValue);
    }
  }
}
