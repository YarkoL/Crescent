/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function Camera(wcCenter, wcWidth, viewportArray) {
    this.mCenter = wcCenter; //vec2
    this.mWidth = wcWidth;
    this.mViewport = viewportArray; //[originX, originY, width, height]
    this.mNearPlane = 0;
    this.mFarPlane = 1000;
    
    this.mViewMatrix = mat4.create();
    this.mProjMatrix = mat4.create();
    this.mVPMatrix = mat4.create();
    this.mBgColor = [0.8, 0.8, 0.8, 1];
};

Camera.prototype.setCenter = function (xPos, yPos) {
    this.mCenter[0] = xPos;
    this.mCenter[1] = yPos;
};
Camera.prototype.getCenter = function () { return this.mCenter; };
Camera.prototype.setWidth = function (width) { this.mWidth = width; };

Camera.prototype.setViewport = function (viewportArray) { this.mViewport = viewportArray; };
Camera.prototype.getViewport = function () { return this.mViewport; };

Camera.prototype.setBackgroundColor = function (newColor) { this.mBgColor = newColor; };
Camera.prototype.getBackgroundColor = function () { return this.mBgColor; };

Camera.prototype.getVPMatrix = function () {
    return this.mVPMatrix;
};

Camera.prototype.setupViewProjection = function() {
    var gl = gEngine.Core.getGL();
    
    /*configure viewport*/
    gl.viewport(this.mViewport[0],this.mViewport[1],this.mViewport[2],this.mViewport[3]);
    gl.scissor(this.mViewport[0],this.mViewport[1],this.mViewport[2],this.mViewport[3]);
    gl.clearColor(this.mBgColor[0],this.mBgColor[1],this.mBgColor[2],this.mBgColor[3]);
    gl.enable(gl.SCISSOR_TEST);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.disable(gl.SCISSOR_TEST);
    
    /*define VP matrix*/
    mat4.lookAt(this.mViewMatrix,
        [this.mCenter[0], this.mCenter[1],10], //camera position
        [this.mCenter[0], this.mCenter[1],0],  //look at position
        [0, 1, 0] //orientation
    );
    
    var halfWidth = 0.5 * this.mWidth;
    //height of world space = width of world space * viewport aspect ratio
    var halfHeight = halfWidth * this.mViewport[3] / this.mViewport[2]; 
    mat4.ortho(this.mProjMatrix,
        -halfWidth, halfWidth, -halfHeight, halfHeight, 
        this.mNearPlane, this.mFarPlane);
        
    mat4.multiply(this.mVPMatrix, this.mProjMatrix, this.mViewMatrix);
    
};


