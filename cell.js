function Cell(value, row, col, fixed) {

  this.value = -1; //empty cell
  this.row = row;
  this.col = col;
  this.isFixed = fixed;

  this.error = false;
  this.lightError = false;

  this.setValue = function(value) {
    this.value = value;
  }

  this.getValue = function() {
    return this.value;
  }
//set the colors of values
  this.getColors = function() {
    let colors = {};

    if (this.error) {
      colors = {
        backColor: { R: 220, G: 0,   B: 0   },
        foreColor: { R: 255, G: 255, B: 255 }
      };
    } else if (this.getValue() === -1) {
      colors = {
        backColor: { R: 220, G: 220, B: 220 },
        foreColor: { R: 220, G: 220, B: 220 }
      };
    } else if (this.getValue() === 0) {
      colors = {
        backColor: { R: 250,   G: 128, B: 114   },
        foreColor: { R: 250, G: 250, B: 250 }
      };
    } else if (this.getValue() === 1) {
      colors = {
        backColor: { R: 139,   G: 0,   B: 139 },
        foreColor: { R: 250, G: 250, B: 250 }
      };
    }
    return colors;
  }

  this.setValue(value);
}
