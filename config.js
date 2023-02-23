// console.clear();
var layer1 = document.getElementById("layer1");
var ctx1 = layer1.getContext("2d");

var layer2 = document.getElementById("layer2");
var ctx2 = layer2.getContext("2d");

canvasSize={w:1000,h:1000};
ctx1.canvas.width = canvasSize.w;
ctx1.canvas.height = canvasSize.h;

ctx2.canvas.width = canvasSize.w;
ctx2.canvas.height = canvasSize.h;
// ctx1.strokeStyle = "#EA25B5";
ctx1.fillStyle = "#00ff00";





function random(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function delay(delayInms) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(2);
    }, delayInms);
  });
}
function distanceBetween2Points(p1,p2){
  return Math.sqrt((p1.x-p2.x)**2+(p1.y-p2.y)**2);
}

function maxObject(obj,prop){
  let maxProp = 0;
  let maxObj;

  for (const i in obj) {
    if (obj[i][prop] > maxProp) {
      maxProp = obj[i][prop];
      maxObj = obj[i];
    }
  }

  return maxObj;
}
function minObject(obj,prop){
  let minProp = Infinity;
  let minObj;

  for (const i in obj) {
    if (obj[i][prop] < minProp) {
      minProp = obj[i][prop];
      minObj = obj[i];
    }
  }
  return minObj;
}

function maxObjectArr(arr,prop){
  let maxProp = 0;
  let maxObj;

  arr.forEach(element => {
  if (element[prop] > maxProp) {
    maxProp = element[prop];
    maxObj = element;
  }
});
  return maxObj;
}
function minObjectArr(arr,prop){
  let minProp = Infinity;
  let minObj;

  arr.forEach(element => {
  if (element[prop] < minProp) {
    minProp = element[prop];
    minObj = element;
  }
});
  return minObj;
}

function ceilN(num){
  return parseFloat(num.toFixed(2));
}

const lineWidth=8
ctx1.lineWidth = lineWidth;
ctx2.lineWidth = lineWidth/2;

const mazeDimensions={
  w: 5,
  h: 5,
};
const cellSize = {
  w: (canvasSize.w - (mazeDimensions.w + 1) * lineWidth) / mazeDimensions.w,
  h: (canvasSize.h - (mazeDimensions.h + 1) * lineWidth) / mazeDimensions.h,
};

const fps=30;

