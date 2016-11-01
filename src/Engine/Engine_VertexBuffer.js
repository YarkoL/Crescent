/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
"use strict";

var gEngine = gEngine || {};

gEngine.VertexBuffer = (function(){
    var verticesOfSquare = [
        0.5, 0.5, 0.0,
        -0.5, 0.5, 0.0,
        0.5, -0.5, 0.0,
        -0.5, -0.5, 0.0
    ];
    var mSquareVertexBuffer = null;
    
    var getGLVertexRef = function() { return mSquareVertexBuffer; };
    
    var init = function() {
        var gl = gEngine.Core.getGL();
        mSquareVertexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, mSquareVertexBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verticesOfSquare), gl.STATIC_DRAW);
    };
    
    var mPublic = {
        init: init,
        getGLVertexRef: getGLVertexRef
    };
    return mPublic;
}());



