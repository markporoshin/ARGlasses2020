import React from 'react';
import { render } from '@testing-library/react';
import App from '../src/App';
import { extractSeparableConvParamsFactory } from 'face-api.js/build/commonjs/common';
import { getLandmarks } from '../src/faceapi';


const fetch = require('node-fetch');
const faceApi = require("face-api.js");
const fs = require('fs');

const canvas = require("canvas")
const {Canvas, Image, ImageData} = canvas;

faceApi.env.monkeyPatch({fetch, Canvas, Image, ImageData});


describe('should get correct coordinates for photos', ()=>{
    
    beforeAll(() => {
        loadModels();
        console.log("Models are loaded");
    });

    const doTest = () => {
        return test('loadImage test', () => {
        // const img = await canvas.loadImage(__dirname +'/photos/' + photo + '.jpg')
        // const landmarks = await faceApi.detectAllFaces(img).withFaceLandmarks();

        // expect(landmarks.lenght).not.toBe(0)

        
        // expect(checkDistance(correct_set,exp_set)).toBe(true)
            console.log('Starting loadImage test...');
            const pathToFace = 'images_to_test/faces/face1.jpg';
            const pathToGlasses = 'images_to_test/glasses/1_1.png'

            const faceSrc = canvas.loadImage(__dirname + pathToFace);
            const glassesSrc = canvas.loadImage(__dirname + pathToGlasses);

            const desc = getLandmarks(faceSrc);

            expect(desc).not.toEqual(null);

            // const anchors = countAnchors(desc, glassesSrc);
            expect(anchors['x'].not.toEqual(0));
            console.log('finish');
        })
    };
  
    describe('doTests', ()=>{
        doTest();
    });
  })
  

