function Beam(initialX, initialY, initialDirection) {
  this.xPos = initialX;
  this.yPos = initialY;
  this.d = initialDirection;


}

function generate() {
  var matrix = [],
      str = "",
      char = "";

  for (var i = 0; i < 16; i++) {
    str = "";
    matrix.push([]);

    for (var j = 0; j < 16; j++) {
      char = [" ", " ", "/", "\\"][Math.floor(Math.random()*4)];
      matrix[i].push(char);
      str += char===" "? "&nbsp;": char;
    }
  }
  return matrix;
}

function pasteMatrix() {
  var textspace = document.getElementById("textspace"),
      matrix = generate();

  for (var i = 0; i < matrix.length; i++) {
    textspace.innerHTML += matrix[i].join("&nbsp;")+"<br/>";
  }

  var animStart = Date.now(), beamCount = 0;
  animation = setInterval( function(){
    if ((Date.now()-animStart) > 1000*beamCount) {
      console.log("spawn beam #"+(++beamCount));
    }
  }, 100);
}
