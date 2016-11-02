/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function Renderable(shader) {
    this.mShader = shader;
    this.mColor = [1, 1, 1, 1];
    this.mTransform = new Transform();
}
Renderable.prototype.draw = function() {
    var gl = gEngine.Core.getGL();
    this.mShader.activateShader(this.mColor);
    this.mShader.loadTransform(this.mTransform.getTransform());
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
};

Renderable.prototype.setColor = function(color) { this.mColor = color;};
Renderable.prototype.getColor = function() { return this.mColor;};
Renderable.prototype.getTransform = function() {return this.mTransform; };


