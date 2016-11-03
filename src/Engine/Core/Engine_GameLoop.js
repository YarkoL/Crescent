/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
"use strict";

var gEngine = gEngine || {};

gEngine.GameLoop = (function() {
    
    var kFPS = 60;
    var kMPF = 1000 / kFPS; //millisecs per frame
    
    // Variables for timing gameloop
    var mPreviousTime;
    var mLagTime;
    var mCurrentTime;
    var mElapsedTime;
    
    //current loop state
    var mIsRunning = false;
    //game logic
    var mMyGame = null;
    
    var _runLoop = function() {
        if(mIsRunning) {
            requestAnimationFrame( function() {
                // this construct ensures that this.draw 
                // and this.update are those that are defined for mMyGame
                _runLoop.call(mMyGame); 
            });  
      
            mCurrentTime = Date.now();
            mElapsedTime = mCurrentTime - mPreviousTime;
            mPreviousTime = mCurrentTime;
            mLagTime += mElapsedTime;
            
            while ((mLagTime >= kMPF) && mIsRunning) {
                //don't draw (just keep updating) until we've caught up
                this.update();
                mLagTime -= kMPF;
            }
            this.draw();
        }
    };
    
    var start = function(myGame) {
        mMyGame = myGame;
        mPreviousTime = Date.now();
        mLagTime = 0.0;
        mIsRunning = true;
        requestAnimationFrame(function(){_runLoop.call(mMyGame);});
    };
    
    var mPublic = {
        start : start
    };
    return mPublic;
}());



