var game;

function setup() {
  
  const numOfCells = 6;
  const cellSizePx = 30;
  
  //create a canvas of grid to draw graphics on a web page
  createCanvas(cellSizePx * numOfCells + 1, cellSizePx * numOfCells + 1);
  background(240);
  
  game = new Takuzu(numOfCells, cellSizePx);
  let gridGen = new GridGenerate();
  game.setGrid(gridGen.generateGrid(numOfCells, cellSizePx, Math.floor(numOfCells*numOfCells * 0.6)));
  game.checkGrid();
}

function draw() {
  game.drawGrid();
}

function mousePressed() {
  let x = mouseX;
  let y = mouseY;

  let cell = game.getCellAt(x, y);
  if (cell !== undefined) {
    game.changeCellValue(cell);
    game.checkGrid();
  }
}


function CheckSequence() {
  
  this.check = function (grid) {
    //clear errors and init rows and cols arrays
    let rowsAndCols = initializeGrid(grid);
    //check 3 cells with same value
    checkThreeSameValuesCells(grid);
    //check that values are out of balance in each rows and cols
    checkUnbalancedValues(grid, rowsAndCols.rows, rowsAndCols.cols);
    checkIdenticity(rowsAndCols.rows);
    checkIdenticity(rowsAndCols.cols);
    //Return true if grid is full and there's no error
    return gridIsFullAndNoError(grid);
  }
  
  this.checkErrors = function (grid) {
    let rowsAndCols = initializeGrid(grid);
    //check 3 cells with same value
    if (checkThreeSameValuesCells(grid)) {
      return true;
    }
    //check unbalanced values
    if (checkUnbalancedValues(grid, rowsAndCols.rows, rowsAndCols.cols)) {
      return true;
    }
    if (checkIdenticity(rowsAndCols.rows)) {
      return true;
    }
    if (checkIdenticity(rowsAndCols.cols)) {
      return true;
    }
    return false;
  }
  
  function initializeGrid(grid) {
    let rows = [];
    let cols = [];
    let size = grid.data.length;
    for (let i = 0; i < size; i++) {
      rows[i] = [];
      cols[i] = [];
    }
    for (let row = 0; row < size; row++) {
      for (let col = 0; col < size; col++) {
        let cell = grid.getCell(row, col);
        rows[row].push(cell);
        cols[col].push(cell);
        cell.error = false;
      }
    }
    return { rows, cols };
  }

  function checkIdenticity(items) {
    let hasError = false;
    for(let i = 0; i < items.length - 1; i++) {
      let item1 = items[i];
      for(let j = i + 1; j < items.length; j++) {
        let item2 = items[j];
        if (isEqualCells(item1, item2)) {
          hasError = true;
          for (let k = 0; k < items.length; k++) {
            item1[k].error = true;
            item2[k].error = true;
          }
        }
      }
    }
    return hasError;
  }

  function gridIsFullAndNoError(grid) {
    let full = true;
    let error = false;
    for (let row = 0; row < grid.data.length; row++) {
      for (let col = 0; col < grid.data.length; col++) {
        let cell = grid.getCell(row, col);
        //If grid is incomplete, stop.
        if(cell.getValue() === -1) {
          full = false;
          break;
        }
        //If grid has error, stop
        if(cell.error) {
          error = true;
          break;
        }
      }
    }
    return full && !error;
  }
//to check three same values in col
  function checkThreeSameValuesCells(grid) {
    let hasError = false;
    let size = grid.data.length;
    for (let row = 0; row < size; row++) {
      for (let col = 0; col < size; col++) {
        let cell = grid.getCell(row, col);
        let horiz = [cell];
        let vertical = [cell];
        if (row > 0) {
          vertical.push(grid.getCell(row - 1, col));
        }
        if (row < size - 1) {
          vertical.push(grid.getCell(row + 1, col));
        }
        if (col > 0) {
          horiz.push(grid.getCell(row, col - 1));
        }
        if (col < size - 1) {
          horiz.push(grid.getCell(row, col + 1));
        }
        if (horiz.length === 3) {
          if (horiz[0].getValue() != -1 &&
            horiz[0].getValue() === horiz[1].getValue() &&
            horiz[1].getValue() == horiz[2].getValue()) {
            horiz[0].error = true;
            horiz[1].error = true;
            horiz[2].error = true;
            hasError = true;
          }
        }
        if (vertical.length === 3) {
          if (vertical[0].getValue() != -1 &&
            vertical[0].getValue() === vertical[1].getValue() &&
            vertical[1].getValue() == vertical[2].getValue()) {
            vertical[0].error = true;
            vertical[1].error = true;
            vertical[2].error = true;
            hasError = true;
          }
        }
      }
    }
    return hasError;
  }

  function checkUnbalancedValues(grid, rows, cols) {
    let hasError = false;
    var limit = grid.data.length / 2;
    for (let i = 0; i < rows.length; i++) {
      let row = rows[i];
      let col = cols[i];
      let nbr0 = 0, nbr1 = 0;
      let nbc0 = 0, nbc1 = 0;
      for (let j = 0; j < row.length; j++) {
        let valr = row[j].getValue();
        let valc = col[j].getValue();
        nbr0 += (valr === 0 ? 1 : 0);
        nbr1 += (valr === 1 ? 1 : 0);
        nbc0 += (valc === 0 ? 1 : 0);
        nbc1 += (valc === 1 ? 1 : 0);
      }
      if (nbr0 > limit || nbr1 > limit) {
        hasError = true;
        for (let j = 0; j < row.length; j++) {
          row[j].error = true;
        }
      }
      if (nbc0 > limit || nbc1 > limit) {
        hasError = true;
        for (let j = 0; j < col.length; j++) {
          col[j].error = true;
        }
      }
    }
    return hasError;
  }

  function isEqualCells(item1, item2) {
    if(item1.length != item2.length) 
      return false;
    else {
      for (let i = 0; i < item1.length; i++) {
        let value1 = item1[i].getValue();
        let value2 = item2[i].getValue();
        if (value1 !== value2 || value1 === -1 || value2 === -1) 
          return false;
      }
      return true;
    }
  }
}
