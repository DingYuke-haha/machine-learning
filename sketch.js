// Copyright (c) 2020 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
BodyPix
=== */

let canvas;
let bodypix;
let video;
let segmentation;
let button;
let buttonClear;
let isSnapped = false;
let clearCanvas = false;

const options = {
  outputStride: 8, // 8, 16, or 32, default is 16
  segmentationThreshold: 0.3, // 0 - 1, defaults to 0.5
};

function preload() {
  bodypix = ml5.bodyPix(options);
}

function setup() {
  canvas = createCanvas(320*2, 240*2);
  canvas.position(350,300);
  background(0);
  button = createButton("click!")
  button.position(800, 250);
  button.mousePressed(Snap);
  buttonClear = createButton("clear the canvas")
  buttonClear.position(850, 250);
  buttonClear.mousePressed(Clear);
  // load up your video
  video = createCapture(VIDEO, videoReady);
  video.size(width/3, height/3);
  video.position(350,100);
  
}

function videoReady() {
  bodypix.segment(video, gotResults);
}

function draw() {
  // background(0);
  if (isSnapped) {
    image(segmentation.backgroundMask, 0, 0, width, height);
    isSnapped = false;
  }
  if (clearCanvas){
    background(0);
    clearCanvas = false;
  }
}

function gotResults(error, result) {
  if (error) {
    console.log(error);
    return;
  }
  segmentation = result;
  bodypix.segment(video, gotResults);
}

function Snap(){
  isSnapped = true;
}
function Clear(){
  clearCanvas = true;
}

