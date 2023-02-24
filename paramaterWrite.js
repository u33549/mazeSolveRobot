function writeParams(){
    document.getElementById("mazeDimensions").innerHTML=`Genişlik: ${mazeDimensions.w} <br> Yükseklik: ${mazeDimensions.h}`;
    document.getElementById("cellSize").innerHTML=`Genişlik: ${cellSize.w} br <br> Yükseklik: ${cellSize.h} br`;
    document.getElementById("lineWidth").innerHTML=`${lineWidth} br`;
    document.getElementById("robotDimensions").innerHTML=`Genişlik: ${Apo.dimensions.w} br <br> Yükseklik: ${Apo.dimensions.h} br`;
    document.getElementById("robotPos").innerHTML=`X: ${Apo.pos.x} <br> Y: ${Apo.pos.y}`;
    document.getElementById("robotAbsoluteDistance").innerHTML=`Üst: ${Apo.absoluteDistance.top} br <br> Alt: ${Apo.absoluteDistance.bottom} br <br> Sol: ${Apo.absoluteDistance.left} br <br> Sağ: ${Apo.absoluteDistance.right} br <br>`;
    document.getElementById("robotSensorLimit").innerHTML=`${Apo.sensorLimit} br`;
    document.getElementById("robotAngle").innerHTML=`${rad2Deg(Apo.angle)}`;
    document.getElementById("robotMoveSpeed").innerHTML=`${Apo.moveSpeed} br/s`;
    document.getElementById("robotRotationSpeed").innerHTML=`${Apo.rotationSpeed} rad/s`;
    document.getElementById("sensorA").innerHTML=`${Apo.sensors.A} br`;
    document.getElementById("sensorB").innerHTML=`${Apo.sensors.B} br`;
    document.getElementById("sensorC").innerHTML=`${Apo.sensors.C} br`;
    document.getElementById("sensorD").innerHTML=`${Apo.sensors.D} br`;
};
