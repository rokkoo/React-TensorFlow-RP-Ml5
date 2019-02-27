import React, { useRef, useEffect, useState } from "react";

import * as ml5 from "ml5";

import { drawKeypoints, drawSkeleton } from "../utils";

// posenet only accept rect images to make predicction
const videoHeight = 450;
const videoWidth = 450;
const color = "#3498db";
const lineWidth = 2;

// When the model is loaded
const __modelLoaded = () => console.log("Model Loaded!");

const M5Render = () => {
  const [loaded, setLoaded] = useState(false)
  const AskForVideoPermission = async () => {
    const video = document.getElementById("video");
    video.width = videoWidth;
    video.height = videoHeight;
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: false,
      video: {
        facingMode: "user",
        width: videoWidth,
        height: videoHeight
      }
    });
    video.srcObject = stream;
    video.onloadedmetadata = () => {
      video.play();
      // Initualize poseNet
      const poseNet = ml5.poseNet(
        video,
        { multiplier: 1, flipHorizontal: true },
        __modelLoaded
      );
      // Listen to new 'pose' events
      poseNet.on("pose", results => {
        setLoaded(true)
        // console.log(results)
        const canvas = document.getElementById("output");
        const ctx = canvas.getContext("2d");
        canvas.width = videoWidth;
        canvas.height = videoHeight;

        ctx.clearRect(0, 0, videoWidth, videoHeight);
        ctx.save();
        ctx.scale(-1, 1);
        ctx.translate(-videoWidth, 0);
        ctx.drawImage(video, 0, 0, videoWidth, videoHeight);
        ctx.restore();

        const minPoseConfidence = 0.1;
        const minPartConfidence = 0.5;

        results.forEach(({ pose }) => {
          const { score } = pose;
          if (score >= minPoseConfidence) {
            const { keypoints } = pose;
            // Draw heatmao pints
            drawKeypoints(keypoints, minPartConfidence, color, ctx, canvas);
            // Draw lines
            drawSkeleton(keypoints, minPartConfidence, color, lineWidth, ctx);
          }
        });
      });
    };
  };

  const canvasRef = useRef(null)

  useEffect(() => {
    if(!loaded)
      AskForVideoPermission();
  });
  return (
    <div style={{padding: 30}}>
      <video id="video" autoPlay hidden/>
      {loaded ? <canvas ref={canvasRef} id="output" />
      : <p>Cargando el modelo...</p>}
    </div>
  );
};

export default M5Render;
