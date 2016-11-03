/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
 function SimpleShader(vertexShaderID, fragmentShaderID) {
    this.mCompiledShader = null;
    this.mShaderVertexPositionAttribute = null;
    this.mPixelColor = null;
    this.mModelTransform = null;
    this.mViewProjTransform = null;

    var gl = gEngine.Core.getGL();

    var vertexShader = this._createShader(vertexShaderID, gl.VERTEX_SHADER);
    var fragmentShader = this._createShader(fragmentShaderID, gl.FRAGMENT_SHADER);
    this.mCompiledShader = gl.createProgram();
    gl.attachShader(this.mCompiledShader, vertexShader);
    gl.attachShader(this.mCompiledShader, fragmentShader);
    gl.linkProgram(this.mCompiledShader);
    if (!gl.getProgramParameter(this.mCompiledShader, gl.LINK_STATUS)) {
        alert("Error linking shader");
        return null;
    }
    
    this.mShaderVertexPositionAttribute = gl.getAttribLocation(this.mCompiledShader, "aSquareVertexPosition");
    this.mPixelColor = gl.getUniformLocation(this.mCompiledShader, "uPixelColor");
    this.mModelTransform = gl.getUniformLocation(this.mCompiledShader, "uModelTransform");
    this.mViewProjTransform = gl.getUniformLocation(this.mCompiledShader, "uViewProjTransform");
    
    gl.bindBuffer(gl.ARRAY_BUFFER, gEngine.VertexBuffer.getGLVertexRef());
    
    gl.vertexAttribPointer(this.mShaderVertexPositionAttribute, 3, gl.FLOAT, false,0,0);
 }
 
 SimpleShader.prototype._createShader = function(filePath, type) {
    var shaderSource, compiledShader;
    var gl = gEngine.Core.getGL();
    
    xmlReq = new XMLHttpRequest();
    xmlReq.open('GET',filePath,false);
    try {
        xmlReq.send();
    } catch (error) {
        alert("Failed to request " + filePath);
        return null;
    }
    shaderSource = xmlReq.responseText;
    if (shaderSource === null) {
        alert("Failed to read " + filePath);
        return null;
    }
    
    compiledShader = gl.createShader(type);
    gl.shaderSource(compiledShader, shaderSource);
    gl.compileShader(compiledShader);
    
    if (!gl.getShaderParameter(compiledShader, gl.COMPILE_STATUS)) {
        alert("A shader compiling error occurred: " +
        gl.getShaderInfoLog(compiledShader));
    }
    return compiledShader; 
 };
 
 SimpleShader.prototype.activateShader = function(pixelColor, vpMatrix) {
    var gl = gEngine.Core.getGL();
    gl.useProgram(this.mCompiledShader);
    gl.uniformMatrix4fv(this.mViewProjTransform, false, vpMatrix);
    gl.enableVertexAttribArray(this.mShaderVertexPositionAttribute);
    gl.uniform4fv(this.mPixelColor, pixelColor);
 };
 
 SimpleShader.prototype.loadTransform = function(modelTransform) {
     var gl = gEngine.Core.getGL();
     //put modelTransform to the shader uniform transform operator
     gl.uniformMatrix4fv(this.mModelTransform, false, modelTransform);
 };

 SimpleShader.prototype.getShader = function() {
   return this.mCompiledShader;  
 };
 
 