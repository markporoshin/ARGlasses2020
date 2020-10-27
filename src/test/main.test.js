import {getCoordinates} from '../components/calc';

const fetch = require('node-fetch');
const faceApi = require('face-api.js');

const canvas = require('canvas');
const {Canvas, Image, ImageData} = canvas;

const fs = require('fs');

const MODEL_URL = __dirname + '/models';

faceApi.env.monkeyPatch({fetch, Canvas, Image, ImageData});
beforeAll(async () => {
    await faceApi.nets.ssdMobilenetv1.loadFromDisk(MODEL_URL);
    await faceApi.nets.faceLandmark68Net.loadFromDisk(MODEL_URL);
});

const dataset = JSON.parse(fs.readFileSync(__dirname + '/data.json', 'utf8'));
const photolist = ['f001', 'f017', 'f073', 'f101', 'f007'];
const defectlist = ['f003', 'f056'];

const glassesNumbers = ['0','1','2','3','4'];
const dif = {
    'h': 20,
    'w': 20,
    'x': 20,
    'y': 20,
    'angle': 4,
    'trans': 0.1
};

describe('photos', () => {
    describe.each(photolist)('%s', (photo) => {
        let pos;
        let img;
        beforeAll(async()=>{
            img = await canvas.loadImage(__dirname + `/photos/${photo}.jpg`);
            pos = await faceApi.detectAllFaces(img).withFaceLandmarks().then(e => e[0].landmarks._positions);
        });
        describe.each(glassesNumbers)('glassNumber %s', (num)=>{
            test('compare', async()=>{
                const coordinates = getCoordinates(pos, +num);
                for(let coord in coordinates){
                    expect(Math.abs(coordinates[coord]-dataset[photo][num].control[coord])).toBeLessThan(dif[coord]);
                }
            });
        });
    });
});

describe('defect', () => {
    describe.each(defectlist)('%s', (photo) => {
        let pos;
        let img;
        beforeAll(async()=>{
            img = await canvas.loadImage(__dirname + `/photos/${photo}.jpg`);
            pos = await faceApi.detectAllFaces(img).withFaceLandmarks();
        });
        test('defected', ()=>{
            expect(pos.length).toBe(0);
        });
    });
});
