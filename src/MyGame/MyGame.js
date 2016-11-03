/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
"use strict";

function MyGame(canvasID) {
    this.mConstColorShader = null;
    this.mBlueSq = null;
    this.mRedSq = null;
    this.mCamera = null;
    
    gEngine.Core.initWebGL(canvasID);
   
    this.init();
}

MyGame.prototype.init = function() {
    this.mCamera = new Camera(
            vec2.fromValues(10,5), //center of world coordinate space
            20,                     //width of world coordinate space
            [20,40,600,300]         //viewport
    );
    this.mCamera.setBackgroundColor([0.6, 0.8, 0.6, 1]);
    this.mConstColorShader = new SimpleShader("src/GLSL/SimpleVS.glsl", "src/GLSL/SimpleFS.glsl");
    this.mBlueSq = new Renderable(this.mConstColorShader);
    this.mRedSq = new Renderable(this.mConstColorShader);
    this.mBlueSq.setColor([0.5,0.5,0.75,1]);
    this.mRedSq.setColor([1,0.25,0.25,1]);
    this.mRedSq.delta = 0.02;
    
    // Centre Blue, slightly rotated square
    this.mBlueSq.getTransform().setPosition(10, 5);
    this.mBlueSq.getTransform().setRotation(0.2); // In Radians
    this.mBlueSq.getTransform().setSize(5, 5);
    
    // centre red square
    this.mRedSq.getTransform().setPosition(10, 5);
    this.mRedSq.getTransform().setSize(2, 2);

    gEngine.GameLoop.start(this);
};    

MyGame.prototype.update = function() {
  var blueTransform = this.mBlueSq.getTransform();
  /*
  var deltaX = 0.05;
  if (blueTransform.getXPos() > 20) { //goes beyond right edge
      blueTransform.setPosition(10,5);
  }
  blueTransform.changeXPos(deltaX);
  */
  blueTransform.changeRotationByDegrees(-1);
  
  var redTransform = this.mRedSq.getTransform();
  
  if (redTransform.getWidth() > 3.5 || redTransform.getWidth() < 0.25) {
      this.mRedSq.delta *= -1;
  }
  redTransform.changeSize(this.mRedSq.delta);
  redTransform.changeRotationByDegrees(1);
};

MyGame.prototype.draw = function() {
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1]);
    this.mCamera.setupViewProjection();
    this.mBlueSq.draw(this.mCamera.getVPMatrix());
    this.mRedSq.draw(this.mCamera.getVPMatrix());
};