var animationId;

function cloneMatrix(arr) {
  return arr.map(function(i){return i.map(function(j){return j;});});
}

function Beam(initialX, initialY, initialDirection) {
  this.xPos = initialX;
  this.yPos = initialY;
  this.d = initialDirection;

  this.step = function() {
    this.d==="r"? this.xPos++:
    this.d==="d"? this.yPos++:
    this.d==="l"? this.xPos--:
    this.d==="u"? this.yPos--: null;

    // this.yPos += this.d==="d"? 1: this.d==="u": -1: 0;
    // this.xPos += this.d==="r"? 1: this.d==="l": -1: 0;
    if (this.xPos>=0 && this.xPos<matrix[0].length && this.yPos>=0 && this.yPos<matrix.length) {
      if (origMatrix[this.yPos][this.xPos].search(/[v\^<>]/) !== -1) console.log("Ayy, shit! This shouldn't happen.");

      this.d = [
          "uldr"[ "rdlu".indexOf(this.d) ],
          "drul"[ "rdlu".indexOf(this.d) ],
          this.d
        ][ "/\\ ".indexOf(origMatrix[this.yPos][this.xPos]) ]; // using a character as index.

      matrix[this.yPos][this.xPos] = "<span class='red-beam'>" + ">v<^"["rdlu".indexOf(this.d)] + '</span>';
    }
  }
}

function generateMatrix() {
  var arr = [],
      str = "",
      char = "";

  for (var i = 0; i < 16; i++) {
    str = "";
    arr.push([]);

    for (var j = 0; j < 16; j++) {
      char = [" ", " ", "/", "\\"][Math.floor(Math.random()*4)];
      arr[i].push(char);
      str += char===" "? "&nbsp;": char;
    }
  }
  return arr;
}

function pasteMatrix() {
  var htmlStr = matrix.map( function(i) {
      return i.map( function(j) {
        return j===" "?"&nbsp;":j;
      }).join("&nbsp;");
    }).join("<br>");

  textspace.innerHTML = htmlStr;

  // textspace.innerHTML = "";
  // for (var i = 0; i < matrix.length; i++) {
  //   textspace.innerHTML += matrix[i].join("&nbsp;")+"<br>";
  // }
}

function animationStep() {
  matrix = cloneMatrix( origMatrix );

  if ( (Date.now()-animStartTime) > 1000*beamCount ) {
    activeBeams.push( new Beam(-1, 7, "r") );
    beamCount++;
  }

  for (var i = 0; i < activeBeams.length; i++) {
    activeBeams[i].step();
  }

  pasteMatrix();
}

function resetAnimation() {
  if (animationId) clearInterval(animationId);
  animStartTime = Date.now(),
  beamCount = 0;
  activeBeams = [];
  matrix = cloneMatrix( origMatrix );

  if (!animationId)
    animationId = setInterval( animationStep, 100 );
}

function initialize() {
  textspace = document.getElementById("textspace");
  origMatrix = generateMatrix();
  matrix = cloneMatrix( origMatrix );

  pasteMatrix();

  resetAnimation();
}
