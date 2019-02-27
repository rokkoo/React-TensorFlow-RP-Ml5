// import React from 'react'
// import * as ml5 from "ml5";
// import P5Wrapper from 'react-p5-wrapper';

// let video;
// let poseNet;
// let poses = [];
// let skeletons = [];

// function sketch (p) {
//     let VIDEO = null
//     let _width = 0
//     let _height = 0

//     p.setup = function() {
//       p.createCanvas(640, 480);

//       // When the model is loaded
//     const __modelLoaded = () => console.log('Model Loaded!')
    
//       // Create a new poseNet method with a single detection
//       poseNet = ml5.poseNet(VIDEO, __modelLoaded);
//       // This sets up an event that fills the global variable "poses"
//       // with an array every time new poses are detected
//       poseNet.on('pose', function (results) {
//         poses = results;
//       });
//     }

//     p.myCustomRedrawAccordingToNewPropsHandler = function (props) {
//         console.log(props)
//       if(props.video) {
//           VIDEO = props.video
//       }

//       if(props.name) {
//           console.log('tenemos name')
//       }
//     };

//     p.draw = function() {
//         p.image(VIDEO, 0, 0, _width, _height);

//         // We can call both functions to draw all keypoints and the skeletons
//         drawKeypoints();
//         drawSkeleton();
//     }

//         // A function to draw ellipses over the detected keypoints
//     function drawKeypoints()  {
//         // Loop through all the poses detected
//         for (let i = 0; i < poses.length; i++) {
//         // For each pose detected, loop through all the keypoints
//         for (let j = 0; j < poses[i].pose.keypoints.length; j++) {
//             // A keypoint is an object describing a body part (like rightArm or leftShoulder)
//             let keypoint = poses[i].pose.keypoints[j];
//             // Only draw an ellipse is the pose probability is bigger than 0.2
//             if (keypoint.score > 0.2) {
//             p.fill(255, 0, 0);
//             p.noStroke();
//             p.ellipse(keypoint.position.x, keypoint.position.y, 10, 10);
//             }
//         }
//         }
//     }
    
//     // A function to draw the skeletons
//     function drawSkeleton() {
//         // Loop through all the skeletons detected
//         for (let i = 0; i < poses.length; i++) {
//         // For every skeleton, loop through all body connections
//         for (let j = 0; j < poses[i].skeleton.length; j++) {
//             let partA = poses[i].skeleton[j][0];
//             let partB = poses[i].skeleton[j][1];
//             p.stroke(255, 0, 0);
//             p.line(partA.position.x, partA.position.y, partB.position.x, partB.position.y);
//         }
//         }
//     }
// }

// const Canvas = (video) => {
//     return (
//         <P5Wrapper sketch={sketch} name='a' video={video}/>
//     )
// }

// export default Canvas