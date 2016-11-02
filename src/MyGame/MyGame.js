/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function MyGame(canvasID) {
    this.mConstColorShader = null;
    gEngine.Core.initWebGL(canvasID);
    
    this.mConstColorShader = new SimpleShader("src/GLSL/SimpleVS.glsl", "src/GLSL/SimpleFS.glsl");
    this.mWhiteSq = new Renderable(this.mConstColorShader);
    this.mRedSq = new Renderable(this.mConstColorShader);
    this.mWhiteSq.setColor([1,1,1,1]);
    this.mRedSq.setColor([1,0,0,1]);
    
    gEngine.Core.clearCanvas([0, 0.8, 0, 1]);
    
    this.mWhiteSq.getTransform().setPosition(-0.25, 0.25);
    this.mWhiteSq.getTransform().setRotation(0.2); 
    this.mWhiteSq.getTransform().setSize(1.2, 1.2);
    this.mWhiteSq.draw();
    
    this.mRedSq.getTransform().setXPos(0.25);
    this.mRedSq.getTransform().setYPos(-0.25);
    this.mRedSq.getTransform().setRotationInDegrees(45); 
    this.mRedSq.getTransform().setWidth(0.4);
    this.mRedSq.getTransform().setHeight(0.5);
    this.mRedSq.draw();
}


