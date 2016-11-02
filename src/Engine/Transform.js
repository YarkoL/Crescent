/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function Transform() {
    this.mPosition = vec2.fromValues(0,0);
    this.mRotation = 0.0; //radians
    this.mScale = vec2.fromValues(1,1);
};
/*translation get, set, change*/
Transform.prototype.setPosition = function (xPos, yPos) { this.setXPos(xPos); this.setYPos(yPos); };
Transform.prototype.getPosition = function () { return this.mPosition; };
Transform.prototype.getXPos = function () { return this.mPosition[0]; };
Transform.prototype.setXPos = function (xPos) { this.mPosition[0] = xPos; };
Transform.prototype.changeXPos = function (delta) { this.mPosition[0] += delta; };
Transform.prototype.getYPos = function () { return this.mPosition[1]; };
Transform.prototype.setYPos = function (yPos) { this.mPosition[1] = yPos; };
Transform.prototype.changeYPos = function (delta) { this.mPosition[1] += delta; };

/*rotation get, set, change*/
Transform.prototype.setRotation = function (radians) {
    this.mRotation = radians;
    while (this.mRotation > (2 * Math.PI)) {
        this.mRotation -= (2 * Math.PI);
    }
};
Transform.prototype.getRotation = function () {  return this.mRotation; };
Transform.prototype.changeRotation = function (delta) {
    this.setRotation(this.mRotation + delta);
};
Transform.prototype.setRotationInDegrees = function (degrees) {
    this.setRotation(degrees * Math.PI / 180.0);
};
Transform.prototype.changeRotationByDegrees = function (deltaDegrees) {
    this.changeRotation(deltaDegrees * Math.PI / 180.0);
};
Transform.prototype.getRotationInDegrees = function () { return this.mRotation * 180.0 / Math.PI; };

/*scale get, set, change*/
Transform.prototype.getSize = function () { return this.mScale; };
Transform.prototype.getWidth = function () { return this.mScale[0]; };
Transform.prototype.setWidth = function (width) { this.mScale[0] = width; };
Transform.prototype.changeWidth = function (delta) { this.mScale[0] += delta; };
Transform.prototype.getHeight = function () { return this.mScale[1]; };
Transform.prototype.setHeight = function (height) { this.mScale[1] = height; };
Transform.prototype.changeHeight = function (delta) { this.mScale[1] += delta; };
Transform.prototype.setSize = function (width, height) {
    this.setWidth(width);
    this.setHeight(height);
};
Transform.prototype.changeSize = function (delta) {
    this.changeWidth(delta);
    this.changeHeight(delta);
};

/* concatenate transformations to an operator */
Transform.prototype.getTransform = function() {
    var matrix = mat4.create(); 
    
    mat4.translate(matrix, matrix, vec3.fromValues(this.getXPos(), this.getYPos(), 0.0)); //for now z always zero
    mat4.rotateZ(matrix, matrix, this.getRotation());
    mat4.scale(matrix, matrix, vec3.fromValues(this.getWidth(), this.getHeight(), 1.0));
    
    return matrix;
};

