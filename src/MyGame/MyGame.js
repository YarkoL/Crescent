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
    
    var xform = mat4.create();
    mat4.translate(xform, xform, vec3.fromValues(-0.25, 0.25, 0.0));
    this.mRedSq.draw(xform);
    
    mat4.identity(xform);
    mat4.rotateZ(xform, xform, 60 * Math.PI / 180);
    this.mWhiteSq.draw(xform);
}


