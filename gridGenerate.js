function GridGenerate() {
  this.checker = new CheckSequence();
  this.generateGrid = function(cellsPerLine, pxPerCell, nbEmpty) {
    this.cellsPerLine = cellsPerLine;
    let grid = new GridCreate(cellsPerLine, pxPerCell);
    for(let i = 0; i < cellsPerLine * cellsPerLine; i++) {
      let coords = this.computeCoords(i);
      //Set random value
      let cell = grid.getCell(coords.row, coords.col);
      cell.setValue(this.generateRandomValue());
      grid.draw();
      if (this.checker.checkErrors(grid)) {
        this.handleError(grid, i, i);
      }
    }
    console.log('Completed');
    this.makeHoles(grid, nbEmpty);
    return grid;
  }
  //to make empty cells in the beginning
  this.makeHoles = function(grid, nbHoles) {
   for (var n = 0; n < nbHoles; n++) {
      var row = Math.floor(random(this.cellsPerLine));
      var col = Math.floor(random(this.cellsPerLine));
      grid.getCell(row, col).setValue(-1);
    }
    for (var row = 0; row < this.cellsPerLine; row++) {
      for (var col = 0; col < this.cellsPerLine; col++) {
        grid.getCell(row, col).isFixed = grid.getCell(row, col).getValue() != -1;
      }
    }
  }

  this.handleError = function(grid, num0, num1) {
    // target position, than switchable cell
    if (num0 !== num1) {
       //All cells between 0 and 1 are deleted
      for (let i = num1; i <= num0; i++) {
        let coords = this.computeCoords(i);
        let cell = grid.getCell(coords.row, coords.col);
        cell.setValue(-1);
      }
    } 
    let coords = this.computeCoords(num1);
    let cell = grid.getCell(coords.row, coords.col);
    this.reverseCellValue(cell);
    // If the inversion produces an error; we go back one square
   if (this.checker.checkErrors(grid)) {
        this.handleError(grid, num0, num1 - 1);
    } else { 
      for (let i = num1; i <= num0; i++) {
        let coords = this.computeCoords(i);
        let cell = grid.getCell(coords.row, coords.col);
        cell.setValue(this.generateRandomValue());
        if (this.checker.checkErrors(grid)) {
          //  exception
          this.handleError(grid, i, i - 1);
        }
      }
    }
  }
  //computing index of cell
  this.computeIndex = function(idxCol, idxrow) {
    return idxRow * this.cellsPerLine + idxCol;
  }
  this.computeCoords = function(index) {
    let row = Math.floor((index / this.cellsPerLine));
    let col = index - (row * this.cellsPerLine);
    return {row, col};
  }
  //to generate started values
  this.generateRandomValue = function() {
    let rdm = Math.floor(random(2));
    return rdm;
  }
  this.reverseCellValue = function(cell) {
      cell.setValue(cell.getValue() === 0 ? 1 : 0);
  }
}