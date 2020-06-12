const fetch = require('node-fetch');
const faceApi = require("face-api.js");

const canvas = require("canvas")
const {Canvas, Image, ImageData} = canvas;


import {getCoordinates} from '../components/calc'

const MODEL_URL = __dirname + '/models'
const delta = {
    h: 20,
    w: 20,
    x: 40,
    y: 40,
    angle: 4
}

faceApi.env.monkeyPatch({fetch, Canvas, Image, ImageData});
beforeAll(async () => {
    await faceApi.nets.ssdMobilenetv1.loadFromDisk(MODEL_URL)
    await faceApi.nets.faceLandmark68Net.loadFromDisk(MODEL_URL)
})

test('f001', async () => {
    console.log('run test f001')
    const img = await canvas.loadImage(__dirname +'/photos/f001.jpg')
    const pos = await faceApi.detectAllFaces(img).withFaceLandmarks().then(e => e[0].landmarks.positions);

    const coordinates = getCoordinates(pos, {height:386, width: 800}, 0)
    const control = {h: 170.11847259865144, w: 352.5771452821791, x: 147.18976629044897, y: 395.7837454329151, angle: -2.9624009833771776}
    for (let key in coordinates){
        expect(Math.abs(coordinates[key] - control[key])).toBeLessThan(delta[key])
    }
})

test('f002', async () => {
    console.log('run test f002')
    const img = await canvas.loadImage(__dirname +'/photos/f002.jpg')
    const pos = await faceApi.detectAllFaces(img).withFaceLandmarks().then(e => e[0].landmarks.positions);

    const coordinates = getCoordinates(pos, {height:386, width: 800}, 0)
    const control = {h: 155.63577487950678, w: 322.5611914601177, x: 73.78715388160884, y: 257.06013583396157, angle: 0.5945989064318563}
    for (let key in coordinates){
        expect(Math.abs(coordinates[key] - control[key])).toBeLessThan(delta[key])
    }
})

test('f003', async () => {
    console.log('run test f003')
    const img = await canvas.loadImage(__dirname +'/photos/f003.jpg')
    const pos = await faceApi.detectAllFaces(img).withFaceLandmarks()
    expect(pos[0]).toBe(undefined)
})

test('f004', async () => {
    console.log('run test f004')
    const img = await canvas.loadImage(__dirname +'/photos/f004.jpg')
    const pos = await faceApi.detectAllFaces(img).withFaceLandmarks().then(e => e[0].landmarks.positions);

    const coordinates = getCoordinates(pos, {height:386, width: 800}, 0)
    const control = {h: 148.58326418001204, w: 307.94458897411823, x: 90.47639932462755, y: 137.11126077021314, angle: 8.498106257527445}
    for (let key in coordinates){
        expect(Math.abs(coordinates[key] - control[key])).toBeLessThan(delta[key])
    }
})

test('f005', async () => {
    console.log('run test f005')
    const img = await canvas.loadImage(__dirname +'/photos/f005.jpg')
    const pos = await faceApi.detectAllFaces(img).withFaceLandmarks().then(e => e[0].landmarks.positions);

    const coordinates = getCoordinates(pos, {height:386, width: 800}, 0)
    const control = {h: 88.92410576999187, w: 184.29866480827332, x: 301.35365113998535, y: 427.9290172127038, angle: -43.78143690477601}
    for (let key in coordinates){
        expect(Math.abs(coordinates[key] - control[key])).toBeLessThan(delta[key])
    }
})

test('f006', async () => {
    console.log('run test f006')
    const img = await canvas.loadImage(__dirname +'/photos/f006.jpg')
    const pos = await faceApi.detectAllFaces(img).withFaceLandmarks().then(e => e[0].landmarks.positions);

    const coordinates = getCoordinates(pos, {height:386, width: 800}, 0)
    const control = {h: 164.5305240675807, w: 340.99590480327606, x: -2.584658119534815, y: 138.44453982861017, angle: -15.08481297494702}
    for (let key in coordinates){
        expect(Math.abs(coordinates[key] - control[key])).toBeLessThan(delta[key])
    }
})

test('f007', async () => {
    console.log('run test f007')
    const img = await canvas.loadImage(__dirname +'/photos/f007.jpg')
    const pos = await faceApi.detectAllFaces(img).withFaceLandmarks().then(e => e[0].landmarks.positions);

    const coordinates = getCoordinates(pos, {height:386, width: 800}, 0)
    const control = {h: 129.82051340613515, w: 269.05805887281895, x: 91.27950244969188, y: 422.53305366248406, angle: -36.22747234285705}
    for (let key in coordinates){
        expect(Math.abs(coordinates[key] - control[key])).toBeLessThan(delta[key])
    }
})

test('f008', async () => {
    console.log('run test f008')
    const img = await canvas.loadImage(__dirname +'/photos/f008.jpg')
    const pos = await faceApi.detectAllFaces(img).withFaceLandmarks().then(e => e[0].landmarks.positions);

    const coordinates = getCoordinates(pos, {height:386, width: 800}, 0)
    const control = {h: 49.631476799063385, w: 102.86316435039043, x: 280.89935892189936, y: 91.58014982877086, angle: 9.767778844705967}
    for (let key in coordinates){
        expect(Math.abs(coordinates[key] - control[key])).toBeLessThan(delta[key])
    }
})

test('f015', async () => {
    console.log('run test f015')
    const img = await canvas.loadImage(__dirname +'/photos/f015.jpg')
    const pos = await faceApi.detectAllFaces(img).withFaceLandmarks().then(e => e[0].landmarks.positions);

    const coordinates = getCoordinates(pos, {height:386, width: 800}, 0)
    const control = {h: 79.9267164528463, w: 165.65122580900788, x: 48.43512593416369, y: 116.55243437738109, angle: -7.847832968795856}
    for (let key in coordinates){
        expect(Math.abs(coordinates[key] - control[key])).toBeLessThan(delta[key])
    }
})

test('f017', async () => {
    console.log('run test f017')
    const img = await canvas.loadImage(__dirname + '/photos/f017.jpg')
    const pos = await faceApi.detectAllFaces(img).withFaceLandmarks().then(e => e[0].landmarks.positions);

    const coordinates = getCoordinates(pos, {height: 386, width: 800}, 0)
    const control = {h: 125.11198174674064, w: 259.2994440346956, x: 112.43302534997648, y: 171.44013632758893, angle: -14.732686737616046}
    for (let key in coordinates) {
        expect(Math.abs(coordinates[key] - control[key])).toBeLessThan(delta[key])
    }
})

test('f059', async () => {
    console.log('run test f059')
    const img = await canvas.loadImage(__dirname +'/photos/f059.jpg')
    const pos = await faceApi.detectAllFaces(img).withFaceLandmarks().then(e => e[0].landmarks.positions);

    const coordinates = getCoordinates(pos, {height:203, width: 557}, 0)
    const control = {h: 134.89341866726613, w: 370.1262768357992, x: 180.92006718479453, y: 222.95669701272428, angle: -16.112720822545043}
    for (let key in coordinates){
        expect(Math.abs(coordinates[key] - control[key])).toBeLessThan(delta[key])
    }
})

test('f066', async () => {
    console.log('run test f066')
    const img = await canvas.loadImage(__dirname +'/photos/f066.jpg')
    const pos = await faceApi.detectAllFaces(img).withFaceLandmarks().then(e => e[0].landmarks.positions);

    const coordinates = getCoordinates(pos, {height:294, width: 642}, 0)
    const control = {h: 189.74275941436537, w: 414.33622974157333, x: 360.3245201581981, y: -13.72935428515816, angle: 21.968640752068968}
    for (let key in coordinates){
        expect(Math.abs(coordinates[key] - control[key])).toBeLessThan(delta[key])
    }
})

test('f069', async () => {
    console.log('run test f069')
    const img = await canvas.loadImage(__dirname +'/photos/f069.jpg')
    const pos = await faceApi.detectAllFaces(img).withFaceLandmarks().then(e => e[0].landmarks.positions);

    const coordinates = getCoordinates(pos, {height:294, width: 642}, 0)
    const control = {h: 187.24147855330293, w: 408.87424908578396, x: 278.9159423982072, y: 281.5265844267527, angle: 12.950299275069547}
    for (let key in coordinates){
        expect(Math.abs(coordinates[key] - control[key])).toBeLessThan(delta[key])
    }
})

test('f070', async () => {
    console.log('run test f070')
    const img = await canvas.loadImage(__dirname +'/photos/f070.jpg')
    const pos = await faceApi.detectAllFaces(img).withFaceLandmarks().then(e => e[0].landmarks.positions);

    const coordinates = getCoordinates(pos, {height:294, width: 642}, 0)
    const control = {h: 97.39049204546853, w: 212.66903365030885, x: 190.8268268413315, y: 47.37391944636021, angle: -1.2451568797629224}
    for (let key in coordinates){
        expect(Math.abs(coordinates[key] - control[key])).toBeLessThan(delta[key])
    }
})

test('f077', async () => {
    console.log('run test f077')
    const img = await canvas.loadImage(__dirname +'/photos/f077.jpg')
    const pos = await faceApi.detectAllFaces(img).withFaceLandmarks().then(e => e[0].landmarks.positions);

    const coordinates = getCoordinates(pos, {height:203, width: 557}, 0)
    const control = {h: 46.07393844252905, w: 100.61043700715527, x: 79.78175249293979, y: 80.90513600191389, angle: 8.525777170900131}
    for (let key in coordinates){
        expect(Math.abs(coordinates[key] - control[key])).toBeLessThan(delta[key])
    }
})

test('f080', async () => {
    console.log('run test f080')
    const img = await canvas.loadImage(__dirname +'/photos/f080.jpg')
    const pos = await faceApi.detectAllFaces(img).withFaceLandmarks().then(e => e[0].landmarks.positions);

    const coordinates = getCoordinates(pos, {height:294, width: 642}, 0)
    const control = {h: 52.169730664692196, w: 113.92165675759315, x: 79.31373370302593, y: 80.00823412968943, angle: 1.7360344964222079}
    for (let key in coordinates){
        expect(Math.abs(coordinates[key] - control[key])).toBeLessThan(delta[key])
    }
})

test('f083', async () => {
    console.log('run test f083')
    const img = await canvas.loadImage(__dirname +'/photos/f083.jpg')
    const pos = await faceApi.detectAllFaces(img).withFaceLandmarks().then(e => e[0].landmarks.positions);

    const coordinates = getCoordinates(pos, {height:294, width: 642}, 0)
    const control = {h: 57.1048700928897, w: 124.6983897946775, x: 62.36381697014077, y: 82.31098509166559, angle: -4.51121445889408}
    for (let key in coordinates){
        expect(Math.abs(coordinates[key] - control[key])).toBeLessThan(delta[key])
    }
})

test('f088', async () => {
    console.log('run test f088')
    const img = await canvas.loadImage(__dirname +'/photos/f088.jpg')
    const pos = await faceApi.detectAllFaces(img).withFaceLandmarks().then(e => e[0].landmarks.positions);

    const coordinates = getCoordinates(pos, {height:203, width: 557}, 0)
    const control = {h: 38.11680953575154, w: 104.58651680499315, x: 64.29073137826691, y: 103.38285617027758, angle: -5.4380454545366455}
    for (let key in coordinates){
        expect(Math.abs(coordinates[key] - control[key])).toBeLessThan(delta[key])
    }
})

test('f089', async () => {
    console.log('run test f089')
    const img = await canvas.loadImage(__dirname +'/photos/f089.jpg')
    const pos = await faceApi.detectAllFaces(img).withFaceLandmarks().then(e => e[0].landmarks.positions);

    const coordinates = getCoordinates(pos, {height:203, width: 557}, 0)
    const control = {h: 52.58085189355868, w: 114.819411277771, x: 65.58690645351058, y: 85.35906849087011, angle: -5.0381079469472265}
    for (let key in coordinates){
        expect(Math.abs(coordinates[key] - control[key])).toBeLessThan(delta[key])
    }
})

test('f090', async () => {
    console.log('run test f090')
    const img = await canvas.loadImage(__dirname +'/photos/f090.jpg')
    const pos = await faceApi.detectAllFaces(img).withFaceLandmarks().then(e => e[0].landmarks.positions);

    const coordinates = getCoordinates(pos, {height:203, width: 557}, 0)
    const control = {h: 55.42904162265361, w: 114.87884274125099, x: 55.503158780033395, y: 88.30971244779042, angle: -10.56108794302295}
    for (let key in coordinates){
        expect(Math.abs(coordinates[key] - control[key])).toBeLessThan(delta[key])
    }
})

test('f091', async () => {
    console.log('run test f091')
    const img = await canvas.loadImage(__dirname +'/photos/f091.jpg')
    const pos = await faceApi.detectAllFaces(img).withFaceLandmarks().then(e => e[0].landmarks.positions);

    const coordinates = getCoordinates(pos, {height:203, width: 557}, 0)
    const control = {h: 54.93011660637143, w: 119.94943830370903, x: 67.54531561884751, y: 84.7554907316047, angle: -3.754378692739372}
    for (let key in coordinates){
        expect(Math.abs(coordinates[key] - control[key])).toBeLessThan(delta[key])
    }
})

test('f099', async () => {
    console.log('run test f099')
    const img = await canvas.loadImage(__dirname +'/photos/f099.jpg')
    const pos = await faceApi.detectAllFaces(img).withFaceLandmarks().then(e => e[0].landmarks.positions);

    const coordinates = getCoordinates(pos, {height:294, width: 642}, 0)
    const control = {h: 44.67250408348845, w: 97.55016197822988, x: 87.82329569398863, y: 85.28081040115441, angle: 6.676644189070127}
    for (let key in coordinates){
        expect(Math.abs(coordinates[key] - control[key])).toBeLessThan(delta[key])
    }
})

test('f109', async () => {
    console.log('run test f109')
    const img = await canvas.loadImage(__dirname +'/photos/f109.jpg')
    const pos = await faceApi.detectAllFaces(img).withFaceLandmarks().then(e => e[0].landmarks.positions);

    const coordinates = getCoordinates(pos, {height:294, width: 642}, 0)
    const control = {h: 39.87028637595475, w: 82.63271787762642, x: 87.16041658890964, y: 82.70219440020159, angle: 5.415068452232771}
    for (let key in coordinates){
        expect(Math.abs(coordinates[key] - control[key])).toBeLessThan(delta[key])
    }
})

test('f110', async () => {
    console.log('run test f110')
    const img = await canvas.loadImage(__dirname +'/photos/f110.jpg')
    const pos = await faceApi.detectAllFaces(img).withFaceLandmarks().then(e => e[0].landmarks.positions);

    const coordinates = getCoordinates(pos, {height:294, width: 642}, 0)
    const control = {h: 51.579490984328714, w: 112.63276602700353, x: 57.563938687618865, y: 89.13966011829318, angle: -7.1676253982653035}
    for (let key in coordinates){
        expect(Math.abs(coordinates[key] - control[key])).toBeLessThan(delta[key])
    }
})

test('f111', async () => {
    console.log('run test f111')
    const img = await canvas.loadImage(__dirname +'/photos/f111.jpg')
    const pos = await faceApi.detectAllFaces(img).withFaceLandmarks().then(e => e[0].landmarks.positions);

    const coordinates = getCoordinates(pos, {height:294, width: 642}, 0)
    const control = {h: 57.94678218419028, w: 126.53685089200735, x: 61.20078920844971, y: 83.42065069027392, angle: -6.742529748819501}
    for (let key in coordinates){
        expect(Math.abs(coordinates[key] - control[key])).toBeLessThan(delta[key])
    }
})
