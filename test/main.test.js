const fetch = require('node-fetch');
const faceApi = require("face-api.js");

const canvas = require("canvas")
const {Canvas, Image, ImageData} = canvas;


const MODEL_URL = __dirname + '/models'

faceApi.env.monkeyPatch({fetch, Canvas, Image, ImageData});

beforeAll(async () => {
    await faceApi.nets.ssdMobilenetv1.loadFromDisk(MODEL_URL)
    await faceApi.nets.faceLandmark68Net.loadFromDisk(MODEL_URL)
});

test('test', ()=>{
    expect(true).toBe(true)
})
