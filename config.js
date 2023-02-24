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
function findPointOnLine(x1, y1, x2, y2, knownX, knownY) {
  const m = (y2 - y1) / (x2 - x1);
  if (knownX !== undefined && knownY === undefined) {
    const y = m * (knownX - x1) + y1;
    return y;
  }
  if (knownY !== undefined && knownX === undefined) {
    const x = (knownY - y1) / m + x1;
    return x;
  }

  console.log("Bir bilinmeyen değer belirtmelisiniz (knownX veya knownY)");
  return null;
}

function rad2Deg(rad){
  return rad * (180/Math.PI);
}
function deg2Rad(deg){
  return deg * (Math.PI / 180.0);
}
function sin(rad){
  return parseFloat(Math.sin(rad).toFixed(10));
}
function cos(rad){
  return parseFloat(Math.cos(rad).toFixed(10))
}
function findPrincipalRad(radians) {
  const normalizedRadians = radians % (2 * Math.PI);
  const principalRadians = normalizedRadians >= 0 ? normalizedRadians : (2 * Math.PI + normalizedRadians);  
  return principalRadians;
}

const lineWidth=4
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

