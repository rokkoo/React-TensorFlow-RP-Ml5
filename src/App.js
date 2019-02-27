import React, { useEffect } from 'react';
import './App.css';
import * as ml5 from 'ml5'
import WebCam from 'react-webcam'
// import P5Wrapper from 'react-p5-wrapper';
import { drawSkeleton  } from './utils'

import sketch from './sketchP5'
import M5Render from './poses/Poses'
// import { drawKeypoints, drawBoundingBox, drawSkeleton } from './utils'

import picture from './person.png'
import dog from './dog.jpg'
import car from './car.jpg'
import door from './puerta.jpg'

const WebCamConfig = () => <WebCam className='video' height={250} width={250} />

const videoHeight = 450
const videoWidth = 450

const guiState = {
  algorithm: 'multi-pose',
  input: {
    mobileNetArchitecture: '0.75',
    outputStride: 16,
    imageScaleFactor: 0.5,
  },
  singlePoseDetection: {
    minPoseConfidence: 0.1,
    minPartConfidence: 0.5,
  },
  multiPoseDetection: {
    maxPoseDetections: 5,
    minPoseConfidence: 0.15,
    minPartConfidence: 0.1,
    nmsRadius: 30.0,
  },
  output: {
    showVideo: true,
    showSkeleton: true,
    showPoints: true,
    showBoundingBox: false,
  },
  net: null,
};

const videoConfig = async () => {
  const video = document.getElementById('video');
  video.width = videoWidth;
  video.height = videoHeight;
  const stream = await navigator.mediaDevices.getUserMedia({
    'audio': false,
    'video': {
      facingMode: 'user',
      width: videoWidth,
      height: videoHeight,
    },
  });
  video.srcObject = stream;
  // when load video properties
  video.onloadedmetadata = () => {
    video.play();
    // Create a new poseNet method
    //flipHorizontal - Defaults to false. If the poses should be flipped/mirrored horizontally. 
    //This should be set to true for videos where the video is by default flipped horizontally (i.e. a webcam),
    // and you want the poses to be returned in the proper orientation.

    const poseNet = ml5.poseNet(video,{ multiplier: 1, flipHorizontal: true } ,modelLoaded);
    
    // When the model is loaded
    function modelLoaded() {
      console.log('Model Loaded!');
    }
    // Listen to new 'pose' events
    poseNet.on('pose', function (results) {
      // console.log(results)
      const canvas = document.getElementById('output');
      const ctx = canvas.getContext('2d')
      canvas.width = videoWidth;
      canvas.height = videoHeight;
    
      ctx.clearRect(0, 0, videoWidth, videoHeight);
    
      ctx.save();
      ctx.scale(-1, 1);
      ctx.translate(-videoWidth, 0);
      ctx.drawImage(video, 0, 0, videoWidth, videoHeight);
      ctx.restore();

      // For each pose (i.e. person) detected in an image, loop through the poses
      // and draw the resulting skeleton and keypoints if over certain confidence
      // scores
      const minPoseConfidence = +guiState.singlePoseDetection.minPoseConfidence;
      const minPartConfidence = +guiState.singlePoseDetection.minPartConfidence;
      console.log(results)
      results.forEach(({pose}) => {
        const { score } = pose
        if (score >= minPoseConfidence) {
          const { keypoints } = pose
          if (guiState.output.showPoints) {
            drawKeypoints(keypoints, minPartConfidence, ctx);
            drawSkeleton(keypoints, minPartConfidence, ctx);
            // drawBoundingBox(keypoints, ctx);
          }
        }
      });
    });
  }
}

const color = "#3498db";
const lineWidth = 2;

function drawKeypoints(keypoints, minConfidence, ctx, scale = 1) {
  for (let i = 0; i < keypoints.length; i++) {
    const keypoint = keypoints[i];

    if (keypoint.score < minConfidence) {
      continue;
    }

    if(keypoint.part === 'nose'){
      const { y, x } = keypoint.position;
      drawPoint(ctx, y * scale, x * scale, 3, color);
    }
    const { y, x } = keypoint.position;
    drawPoint(ctx, y * scale, x * scale, 3, color);

  }
}

function drawPoint(ctx, y, x, r, color) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, 2 * Math.PI);
  ctx.fillStyle = color;
  ctx.fill();
}

// // A function to draw the skeletons
// function drawSkeleton(poses, ctx) {
//   // Loop through all the skeletons detected
//   for (let i = 0; i < poses.length; i++) {
//     // For every skeleton, loop through all body connections
//     for (let j = 0; j < poses[i].skeleton.length; j++) {
//       let partA = poses[i].skeleton[j][0];
//       let partB = poses[i].skeleton[j][1];
//       // stroke(255, 0, 0);
//       // line(partA.position.x, partA.position.y, partB.position.x, partB.position.y);
//     }
//   }
// }

// function drawSegment([ay, ax], [by, bx], color, scale, ctx) {
//   ctx.beginPath();
//   ctx.moveTo(ax * scale, ay * scale);
//   ctx.lineTo(bx * scale, by * scale);
//   ctx.lineWidth = lineWidth;
//   ctx.strokeStyle = color;
//   ctx.stroke();
// }

const moveCalc = () => {
  // Initialize the Image Classifier method with MobileNet
  // const classifier = ml5.imageClassifier('Mobilenet', modelLoaded);
  // // When the model is loaded
  // function modelLoaded() {
  //   console.log('Model Loaded!');
  // }
  // // Put the image to classify inside a variable
  // const image = document.getElementById('image');
  // const video = document.getElementsByClassName('video');
  // // Make a prediction with a selected image
  // classifier.predict(image, video, 5, function(err, results) {
  //   // print the result in the console
  //   console.log(results);
  // })

}
const App = () => {
  useEffect(() => {
    // videoConfig()
  })
  return (
    <div className="App">
      <img src={door} width={350} height={350} id='image' alt='' hidden/>
      {/* <WebCamConfig /> */}
      {/* <video id="video" autoPlay hidden></video>
      <canvas id='output' hidden/> */}
      {/* <P5Wrapper sketch={sketch} /> */}
      <M5Render />
    </div>
  );
}

export default App;
