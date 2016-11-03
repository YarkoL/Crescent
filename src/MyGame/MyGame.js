/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function MyGame(canvasID) {
    this.mConstColorShader = null;
    this.mBlueSq = null;
    this.mRedSq = null;
    
    gEngine.Core.initWebGL(canvasID);
    
    this.mCamera = new Camera(
            vec2.fromValues(10,5), //center of world coordinate space
            20,                     //width of world coordinate space
            [20,40,600,300]         //viewport
    );
    
    this.mConstColorShader = new SimpleShader("src/GLSL/SimpleVS.glsl", "src/GLSL/SimpleFS.glsl");
    this.mBlueSq = new Renderable(this.mConstColorShader);
    this.mRedSq = new Renderable(this.mConstColorShader);
    this.mBlueSq.setColor([0.5,0.5,0.75,1]);
    this.mRedSq.setColor([1,0.25,0.25,1]);
    
    //corner squares
    this.mTLSq = new Renderable(this.mConstColorShader);
    this.mTLSq.setColor([0.9, 0.1, 0.1, 1]);
    this.mTRSq = new Renderable(this.mConstColorShader);
    this.mTRSq.setColor([0.1, 0.9, 0.1, 1]);
    this.mBRSq = new Renderable(this.mConstColorShader);
    this.mBRSq.setColor([0.1, 0.1, 0.9, 1]);
    this.mBLSq = new Renderable(this.mConstColorShader);
    this.mBLSq.setColor([0.1, 0.1, 0.1, 1]);
    
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1]);
    
    this.mCamera.setupViewProjection();
    var vpMatrix = this.mCamera.getVPMatrix();
    
    // Centre Blue, slightly rotated square
    this.mBlueSq.getTransform().setPosition(10, 5);
    this.mBlueSq.getTransform().setRotation(0.2); // In Radians
    this.mBlueSq.getTransform().setSize(5, 5);
    this.mBlueSq.draw(vpMatrix);
    
    // centre red square
    this.mRedSq.getTransform().setPosition(10, 5);
    this.mRedSq.getTransform().setSize(2, 2);
    this.mRedSq.draw(vpMatrix);

    // top left
    this.mTLSq.getTransform().setPosition(0, 10);
    this.mTLSq.draw(vpMatrix);

    // top right
    this.mTRSq.getTransform().setPosition(20, 10);
    this.mTRSq.draw(vpMatrix);

    // bottom right
    this.mBRSq.getTransform().setPosition(20, 0);
    this.mBRSq.draw(vpMatrix);

    // bottom left
    this.mBLSq.getTransform().setPosition(0, 0);
    this.mBLSq.draw(vpMatrix);
    
}


