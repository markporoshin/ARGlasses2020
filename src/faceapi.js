// ********************************************************
// Imports
// ********************************************************

import * as faceapi from 'face-api.js';

// ********************************************************
// Class
// ********************************************************

export async function loadModels() {
  console.log('face-api create models...');
  const MODEL_URL = process.env.PUBLIC_URL + '/weights';
  await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL);
  await faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL);
  await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
  console.log('face-api loaded models!');
}

export async function getLandmarks(imageSrc) {
  let img = await faceapi.fetchImage(imageSrc);
  console.log('face-api start detect face...');
  let fullDesc = await  faceapi
      .detectAllFaces(img)
      .withFaceLandmarks();
  console.log('face-api completed face detection.');
  return fullDesc;
}

