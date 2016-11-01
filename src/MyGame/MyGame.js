/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function MyGame(canvasID) {
    this.mShader = null;
    gEngine.Core.initWebGL(canvasID);
    this.mShader = new SimpleShader("src/GLSL/SimpleVS.glsl", "src/GLSL/SimpleFS.glsl");
    gEngine.Core.clearCanvas([0, 0.8, 0, 1]);
    this.mShader.activateShader([0,0,1,1]);
    
    var gl = gEngine.Core.getGL();
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
}


