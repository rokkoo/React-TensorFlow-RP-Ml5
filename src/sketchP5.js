// import * as ml5 from "ml5";

// export default function sketch(p) {
//   let video;
//   let _VIDEO;
//   let _height;
//   let _width;
//   let poseNet;
//   let poses = [];

//   p.setup = function() {
//     p.createCanvas(640, 480);
//     video = p.createCapture(_VIDEO);
//     video.size(_width, _height);

//     // Create a new poseNet method with a single detection
//     poseNet = ml5.poseNet(video, modelReady);
//     // This sets up an event that fills the global variable "poses"
//     // with an array every time new poses are detected
//     poseNet.on("pose", function(results) {
//       poses = results;
//     });
//     // Hide the video element, and just show the canvas
//     video.hide();
//   };

//   function modelReady() {
//     console.log('Modelo cargado')
//   }

//   p.myCustomRedrawAccordingToNewPropsHandler = function({
//     height,
//     width,
//     video
//   }) {
//     _height = height;
//     _width = width;
//     _VIDEO = video;
//   };

//   p.draw = function() {
//     p.image(video, 0, 0, _width, _height);
//     // We can call both functions to draw all keypoints and the skeletons
//     drawKeypoints();
//     // drawSkeleton();
//   };

//   p.modelReady = function() {
//       console.log('modelo cargado')
//   };

//   // A function to draw ellipses over the detected keypoints
// function drawKeypoints() {
//     // Loop through all the poses detected
//     for (let i = 0; i < poses.length; i++) {
//       // For each pose detected, loop through all the keypoints
//       let pose = poses[i].pose;
//       for (let j = 0; j < pose.keypoints.length; j++) {
//         // A keypoint is an object describing a body part (like rightArm or leftShoulder)
//         let keypoint = pose.keypoints[j];
//         // Only draw an ellipse is the pose probability is bigger than 0.2
//         if (keypoint.score > 0.2) {
//           p.fill(255, 0, 0);
//           p.noStroke();
//           p.ellipse(keypoint.position.x, keypoint.position.y, 10, 10);
//         }
//       }
//     }
//   }
// }
