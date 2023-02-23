class Cell {
  constructor(x, y, isStart, isFinish) {
    this.pos = {
      x: x,
      y: y,
    };
    this.cordinate={
      x:this.pos.x * cellSize.w + (this.pos.x + 1) * lineWidth,
      y:this.pos.y * cellSize.h + (this.pos.y + 1) * lineWidth
    }
    this.walls = {
      top: 1,
      bottom: 1,
      left: 1,
      right: 1,
    };
    this.isVisited = 0;
    this.isStart = isStart;
    this.isFinish = isFinish;
  }
}

class Maze {
  constructor() {
    this.startCol = random(0, mazeDimensions.w);
    this.finishCol = random(0, mazeDimensions.w);
    this.area = [];
    for (var i = 0; i < mazeDimensions.h; i++) {
      this.area.push(new Array(mazeDimensions.w));
      for (var l = 0; l < mazeDimensions.w; l++) {
        if (i === 0 && l === this.startCol) {
          this.area[i][l] = new Cell(l, i, 1, 0);
        } else if (i === mazeDimensions.h - 1 && l === this.finishCol) {
          this.area[i][l] = new Cell(l, i, 0, 1);
        } else {
          this.area[i][l] = new Cell(l, i, 0, 0);
        }
      }
    }
    this.notVisitedCellCount=mazeDimensions.w*mazeDimensions.h
    this.wallRows=[];
    this.wallCols=[];
    for (var i = 0;i<mazeDimensions.w+1;i++){
      this.wallCols.push((lineWidth/2)+(cellSize.w*i)+(i*lineWidth))
    }

    for (var i = 0;i<mazeDimensions.h+1;i++){
      this.wallRows.push((lineWidth/2)+(cellSize.h*i)+(i*lineWidth))
    }

  }

  breakeWall(x, y, direction) {
    
    if (direction === 0) {
      this.area[y][x].walls.top = 0;
      if (y > 0) {
        this.area[y - 1][x].walls.bottom = 0;
      }
    }

    else if (direction === 1) {
      this.area[y][x].walls.bottom = 0;
      if (y < mazeDimensions.h - 1) {
        this.area[y + 1][x].walls.top = 0;
      }
    }

    else if (direction === 2) {
      this.area[y][x].walls.left = 0;
      if(x > 0){
        this.area[y][x - 1].walls.right = 0;
      }
    }

    else if (direction === 3) {
      this.area[y][x].walls.right = 0;

      if(x < mazeDimensions.w - 1){
        this.area[y][x + 1].walls.left = 0;
      }
      
    }
  }
  findAvailableCells(x,y){
    let availableCellsA=[]
    let availableCellsB=[]

    this.area[y][x].isVisited=1;
    if (y > 0) {
        availableCellsA.push(this.area[y-1][x])
    }
    if (y < mazeDimensions.h - 1) {
        availableCellsA.push(this.area[y+1][x])
    }
    if(x > 0){
        availableCellsA.push(this.area[y][x-1])
    }
    if(x < mazeDimensions.w - 1){
        availableCellsA.push(this.area[y][x+1])
    }
    for(var i=0;i<availableCellsA.length;i++){
        if(availableCellsA[i].isVisited){
            continue;
        }
        availableCellsB.push(availableCellsA[i])
    }
    return availableCellsB;
  }
  openWay(x,y,cell){
    let cellx= cell.pos.x
    let celly= cell.pos.y
    if(x>cellx){
        this.breakeWall(x,y,2);
        // console.log("a");
    }
    if(x<cellx){
        this.breakeWall(x,y,3);
        // console.log("b");
    }
    if(y>celly){
        this.breakeWall(x,y,0);
        // console.log("c");
    }
    if(y<celly){
        this.breakeWall(x,y,1);
        // console.log("d");

    }
  }
  drawMaze(x,y){
    let availableCells=this.findAvailableCells(x,y);
    while(true){
        if(availableCells.length==0){
            return;
        }
        if(x==this.finishCol && y==mazeDimensions.h-1){
          return;
        }

        let selectedCell=availableCells[random(0,availableCells.length)]
        this.openWay(x,y,selectedCell)
        this.drawMaze(selectedCell.pos.x,selectedCell.pos.y)
        availableCells=this.findAvailableCells(x,y);
    }
    
  }
}

const Dobby = new Maze(mazeDimensions.w, mazeDimensions.h);
Dobby.drawMaze(Dobby.startCol,0)
