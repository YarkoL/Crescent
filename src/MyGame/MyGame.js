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
    
    this.mRedSq.draw();
    this.mWhiteSq.draw();
    
}


