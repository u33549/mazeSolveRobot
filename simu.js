function drawWals() {
  ctx1.beginPath();
  ctx1.strokeStyle = "#EA25B5";
  

  let maze = Dobby.area;
  for (var i = 0; i < maze.length; i++) {
    for (var l = 0; l < maze[i].length; l++) {
      var x = l * cellSize.w + (l + 1) * lineWidth;
      var y = i * cellSize.h + (i + 1) * lineWidth;
      if (maze[i][l].isVisited) {
        ctx1.fillStyle = "#ff00ff";
        // ctx1.fillRect(x, y, cellSize.w, cellSize.h);
      }
      if (maze[i][l].isStart) {
        ctx1.fillStyle = "#fff";
        ctx1.fillRect(x, y, cellSize.w, cellSize.h);
      }
      if (maze[i][l].isFinish) {
        ctx1.fillStyle = "#fff";
        ctx1.fillRect(x, y, cellSize.w, cellSize.h);
      }
      if (maze[i][l].walls.top) {
        var x = l * cellSize.w + (l + 1) * lineWidth;
        var y = i * cellSize.h + lineWidth / 2 + i * lineWidth;
        ctx1.moveTo(x - lineWidth, y);
        ctx1.lineTo(cellSize.w + x + lineWidth, y);
        ctx1.stroke();
      }
      if (maze[i][l].walls.bottom) {
        var x = l * cellSize.w + (l + 1) * lineWidth;
        var y = (i + 1) * cellSize.h + lineWidth / 2 + (i + 1) * lineWidth;
        ctx1.moveTo(x - lineWidth, y);
        ctx1.lineTo(cellSize.w + x + lineWidth, y);
        ctx1.stroke();
      }
      if (maze[i][l].walls.left) {
        var x = l * cellSize.w + lineWidth / 2 + l * lineWidth;
        var y = i * cellSize.h + (i + 1) * lineWidth;
        ctx1.moveTo(x, y - lineWidth);
        ctx1.lineTo(x, y + cellSize.h + lineWidth);
        ctx1.stroke();
      }
      if (maze[i][l].walls.right) {
        var x = (l + 1) * cellSize.w + lineWidth / 2 + (l + 1) * lineWidth;
        var y = i * cellSize.h + (i + 1) * lineWidth;
        ctx1.moveTo(x, y - lineWidth);
        ctx1.lineTo(x, y + cellSize.h + lineWidth);
        ctx1.stroke();
      }
    }
  }
  ctx1.beginPath();

}
let b=1;
setInterval(function() {
  if(b){
     ctx1.clearRect(0, 0, canvasSize.w, canvasSize.h);
  ctx2.clearRect(0, 0, canvasSize.w, canvasSize.h);
  drawWals();
  Apo.draw();
  Apo.calcMove();
  writeParams();
  }
 
},1000/fps)

// Apo.draw();
// drawWals();
// //Apo.calcMove();
// writeParams();