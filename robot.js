class Robot {
  constructor() {
    this.dimensions = {
      w: ceilN(Math.sqrt((cellSize.w * cellSize.h) / 4)),
      h: ceilN(Math.sqrt((cellSize.w * cellSize.h) / 4)),
    };
    this.moveSpeed = 0;
    this.rotationSpeed = 0;
    this.angle = 0;
    this.pos = {
      x: ceilN(
        (Dobby.area[0][Dobby.startCol].cordinate.x + cellSize.w / 2)
      ),
      y: ceilN(
        (Dobby.area[0][Dobby.startCol].cordinate.y + cellSize.h / 2)
      ),
    };
    this.sensors = {
      A: 0,
      B: 0,
      C: 0,
      D: 0,
    };
    this.sensorsPos = {
      A: {x:0,y:0},
      B: {x:0,y:0},
      C: {x:0,y:0},
      D: {x:0,y:0},
    };
    this.absoluteDistance = {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    };
    this.sensorLimit = Infinity;
    this.cornersWithoutAngel = [
        {
          x: 0,
          y: 0,
        },
        {
          x: 0,
          y: 0,
        },
        {
          x: 0,
          y: 0,
        },      {
          x: 0,
          y: 0,
        },
      ];
    this.corners={A:{x:0,y:0},B:{x:0,y:0},C:{x:0,y:0},D:{x:0,y:0}};
    this.absoluteCorners={
      top: {x:0,y:0},
      bottom: {x:0,y:0},
      left: {x:0,y:0},
      right: {x:0,y:0},
    }
    this.set_allParams();
  }
  draw() {
    ctx2.beginPath();
    ctx2.save();
    ctx2.translate(this.pos.x, this.pos.y);
    ctx2.rotate((this.angle * Math.PI) / 180);
    ctx2.fillStyle = '#f00';
    ctx2.fillRect(
      -this.dimensions.w / 2,
      -this.dimensions.h / 2,
      this.dimensions.w,
      this.dimensions.h
    );
    ctx2.fillStyle = '#00f';
    // ctx2.fillRect(-4, -4, 8, 8);

    ctx2.fillRect(
      -this.dimensions.w / 2 + this.dimensions.w / 4,
      -this.dimensions.h / 2,
      this.dimensions.w / 2,
      this.dimensions.h / 10
    );
    ctx2.fillRect(
      -this.dimensions.w / 2 + this.dimensions.w / 4,
      this.dimensions.h / 2 - this.dimensions.h / 10,
      this.dimensions.w / 2,
      this.dimensions.h / 10
    );
    ctx2.moveTo(-lineWidth/4,0)
    ctx2.lineTo(-lineWidth/4,this.dimensions.h / 4)
    ctx2.lineTo(-lineWidth*2,this.dimensions.h / 8)
    ctx2.moveTo(-lineWidth/4,this.dimensions.h / 4)
    ctx2.lineTo(+lineWidth*2,this.dimensions.h / 8)
    ctx2.stroke();

    ctx2.fillRect(
      -this.dimensions.w / 2,
      -this.dimensions.h / 2 + this.dimensions.h / 4,
      this.dimensions.w / 10,
      this.dimensions.h / 2
    );
    ctx2.fillRect(
      +this.dimensions.w / 2 - this.dimensions.w / 10,
      -this.dimensions.h / 2 + this.dimensions.h / 4,
      this.dimensions.w / 10,
      this.dimensions.h / 2
    );

    ctx2.restore();
  }

  set_corners() {
    this.set_cornersWithoutAngel();
    let pos=[]
    for (var i = 0; i < this.cornersWithoutAngel.length; i++) {
      var x1 =  this.cornersWithoutAngel[i].x;
      var y1 =  this.cornersWithoutAngel[i].y;

      var nPos = {
        x:
          (x1 - this.pos.x) * Math.cos((this.angle * Math.PI) / 180) -
            (y1 - this.pos.y) * Math.sin((this.angle * Math.PI) / 180) +
            this.pos.x,
          y:(x1 - this.pos.x) * Math.sin((this.angle * Math.PI) / 180) +
            (y1 - this.pos.y) * Math.cos((this.angle * Math.PI) / 180) +
            this.pos.y
      };
      pos.push(nPos);
    }
    this.corners.A=pos[0];
    this.corners.B=pos[1];
    this.corners.C=pos[2];
    this.corners.D=pos[3]

    
    // pos.forEach(function(e,id){
    //   if(id==3){
    //     ctx2.fillStyle="#0f0"
    // ctx2.fillRect(e.x-4, e.y-4, 8, 8);
    //   }
        

    // })
    return pos;

  }
  set_cornersWithoutAngel(){
    this.cornersWithoutAngel = [
        {
          x: this.pos.x - this.dimensions.w / 2,
          y: this.pos.y - this.dimensions.h / 2,
        },
        {
          x: this.pos.x + this.dimensions.w / 2,
          y: this.pos.y - this.dimensions.h / 2,
        },
        {
          x: this.pos.x + this.dimensions.w / 2,
          y: this.pos.y + this.dimensions.h / 2,
        },      {
          x: this.pos.x - this.dimensions.w / 2,
          y: this.pos.y + this.dimensions.h / 2,
        },
      ];
  }
  set_sensorPos(){
    this.set_corners();
    this.sensorsPos.A={x:(this.corners.C.x+this.corners.D.x)/2,y:(this.corners.C.y+this.corners.D.y)/2}
    this.sensorsPos.B={x:(this.corners.A.x+this.corners.D.x)/2,y:(this.corners.A.y+this.corners.D.y)/2}
    this.sensorsPos.C={x:(this.corners.C.x+this.corners.B.x)/2,y:(this.corners.C.y+this.corners.B.y)/2}
    this.sensorsPos.D={x:(this.corners.A.x+this.corners.B.x)/2,y:(this.corners.A.y+this.corners.B.y)/2}
  }
  set_absoluteCorners(){
    this.set_corners();
    this.absoluteCorners.top=minObject(this.corners,"y");
    this.absoluteCorners.bottom=maxObject(this.corners,"y");
    this.absoluteCorners.right=maxObject(this.corners,"x");
    this.absoluteCorners.left=minObject(this.corners,"x");
  }

  get_wallPointsAtSightLevel(x1,y1,x2,y2){
    let points=[];
    for(var i=0;i<Dobby.wallCols.length;i++){
      var point={
        x:Dobby.wallCols[i],
        y:(((Dobby.wallCols[i]-x1)/(x2-x1))*(y2-y1))+y1,
        type:"c"
      }
      points.push(point);
    }
    for(var i=0;i<Dobby.wallRows.length;i++){
      var point={
        x:    x1+((x2-x1)*((Dobby.wallRows[i]-y1)/(y2-y1))),
        y:Dobby.wallRows[i],
        type:"r"

      }
      points.push(point);
    }
    let pointsO=[]
    for(var i=0;i<points.length;i++){
      if(x1>x2 && x1<points[i].x){         
          continue;
      }
      if(x1<x2 && x1>points[i].x){
          continue;
      }
      if(y1>y2 && y1<points[i].y){         
        continue;
    }
    if(y1<y2 && y1>points[i].y){
        continue;
    }
      if(points[i].x>canvasSize.w || points[i].y>canvasSize.h || points[i].x<0 || points[i].y<0){
        continue;
      }
      pointsO.push(points[i])
    }
    return pointsO;
  }
  check_isWall(point){
    // console.log(point)

    if(canvasSize.w-4<point.x && point.x<canvasSize.w ){
      return 1;
    }
    if(canvasSize.h-4<point.y && point.h<canvasSize.y ){
      return 1;
    }

    if(point.type=="r"){

      if(this.angle%45===0){
        point.x+=2
      }
      var col=-1;
      for(var i=0;i<Dobby.wallCols.length;i++){
        if(point.x>Dobby.wallCols[i]){
          col++;
        }
      }
      for(var i=0;i<Dobby.area.length;i++){
        // console.log(`col:${col},i:${i}`)

        if(point.y+2===Dobby.area[i][col].cordinate.y){
          if(Dobby.area[i][col].walls.top){
            return 1;
          }
        }
      }
    }

    else if(point.type=="c"){
      
      if(this.angle%45===0){
        point.y+=2
      }
      var row=-1;
      for(var i=0;i<Dobby.wallRows.length;i++){
        if(point.y>Dobby.wallRows[i]){
          row++;
        }
      }
      for(var i=0;i<Dobby.area.length;i++){
        // console.log(`row:${row},i:${i}`)
        if(point.x+2===Dobby.area[row][i].cordinate.x){
          if(Dobby.area[row][i].walls.left){
            return 1;
          }
        }
      }
    }
   
    return 0;

  }
  calc_sensor(x1,y1,x2,y2,abs=0){

    let points=this.get_wallPointsAtSightLevel(x1,y1,x2,y2);
    
    let points0=[];
    for(var i=0;i<points.length;i++){
      if(this.check_isWall(points[i])){
        points0.push(points[i])
      }
      
    }
    // console.log(points0)

    // points0.forEach(function(e){
    //   ctx2.fillStyle="#0f0";
    //   ctx2.fillRect(e.x-2,e.y-2,4,4)
    // })

    
    
    for(i=0;i<points0.length;i++){
      if(abs){
        points0[i]["distance"]=distanceBetween2Points(points0[i],{x:x1,y:y1})

      }
      else{
        points0[i]["distance"]=distanceBetween2Points(points0[i],{x:x2,y:y2})
      }
    }
    if(abs==0){
      ctx2.beginPath();
      ctx2.strokeStyle = "#0f0";
      ctx2.moveTo(x2, y2);
      ctx2.lineTo(minObjectArr(points0,"distance").x,minObjectArr(points0,"distance").y);
      ctx2.stroke();
      ctx2.closePath();
    }
    else if(abs==1){
      ctx2.beginPath();
      ctx2.strokeStyle = "#00f";
      ctx2.moveTo(x1, y1);
      // console.log(x1,y2)
      // console.log(minObjectArr(points0,"distance").x,minObjectArr(points0,"distance").y)
      // console.log("------------------")
      
      ctx2.lineTo(minObjectArr(points0,"distance").x,minObjectArr(points0,"distance").y);
      ctx2.stroke();
      ctx2.closePath();

    }
    let r=undefined;
    if(minObjectArr(points0,"distance").distance<this.sensorLimit){
      r=minObjectArr(points0,"distance").distance-((1/Math.cos(this.angle))*(lineWidth/2))
    }
    return r;
  }
  set_sensors(){
    this.set_sensorPos();
    this.sensors.A=this.calc_sensor(this.pos.x,this.pos.y,this.sensorsPos.A.x,this.sensorsPos.A.y);
    this.sensors.B=this.calc_sensor(this.pos.x,this.pos.y,this.sensorsPos.B.x,this.sensorsPos.B.y);
    this.sensors.C=this.calc_sensor(this.pos.x,this.pos.y,this.sensorsPos.C.x,this.sensorsPos.C.y);
    this.sensors.D=this.calc_sensor(this.pos.x,this.pos.y,this.sensorsPos.D.x,this.sensorsPos.D.y);
  }
  set_absoluteDistance() {
    this.set_corners(),
    this.absoluteDistance.top=this.calc_sensor(this.absoluteCorners.top.x,this.absoluteCorners.top.y,this.absoluteCorners.top.x,0,1);
    this.absoluteDistance.bottom=this.calc_sensor(this.absoluteCorners.bottom.x,this.absoluteCorners.bottom.y,this.absoluteCorners.bottom.x,canvasSize.h,1);
    this.absoluteDistance.left=this.calc_sensor(this.absoluteCorners.left.x,this.absoluteCorners.left.y,0,this.absoluteCorners.left.y,1);
    this.absoluteDistance.right=this.calc_sensor(this.absoluteCorners.right.x,this.absoluteCorners.right.y,canvasSize.w,this.absoluteCorners.right.y,1);
  }
  set_allParams(){
    this.set_cornersWithoutAngel();
    this.set_corners();
    this.set_sensorPos();
    this.set_sensors();
    this.set_absoluteCorners();
    this.set_absoluteDistance();
  }
  set_speed(x){this.speed=x;}
  set_rotationSpeed(x){this.rotationSpeed=x;}
  calcMove(){
    let speed=this.speed/fps;
  }

}
const Apo = new Robot();
drawWals();
Apo.draw();







// for(var l=0;l<Dobby.area[0].length;l++){
//   if(Dobby.area[j][l].cordinate.y===(pointsO[i].y+2)){
//     if(Dobby.area[j][l].walls.top){
//       points1.push(pointsO[i])
//       console.log("a")

//     }
//   } 
// }