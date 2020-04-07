import React from 'react';
import {getLandmarks, loadModels} from '../faceapi'
import {faces, glasses} from '../resource'
import {Col, Row} from 'react-bootstrap';



function drawScene(state) {
    if (!state.isFaceLoaded) {
        return
    }
        
    let canvas = state.canvas
    let ctx = canvas.getContext('2d')
    ctx.fillStyle = "#FF0000";
    ctx.strokeStyle = "#FF0000";
    
    let fullDesc = state.fullDesc
    let faceImg = state.face

    var wCanvas = ctx.canvas.width;
    var hCanvas = ctx.canvas.height;

    const wFace = faceImg.width;
    const hFace = faceImg.height;

    let kx = wCanvas / wFace;
    let ky = hCanvas / hFace;

    let kImg = (kx) < (ky) ? (kx) : (ky);

    ctx.drawImage(faceImg, 0, 0, wFace * kImg, hFace * kImg);

    if (!state.isGlassesLoad || !state.isLandmarksLoad) {
        return
    }

    const positions = fullDesc[0].landmarks._positions;
    clearInterval(state.onGlassesId)
    let glasses = state.glasses;

    let leftPoint = positions[36];
    let rightPoint = positions[45];

    let angle = Math.atan((rightPoint._y - leftPoint._y) / (rightPoint._x - leftPoint._x))
    console.log('angle: ' + angle)
    
    let centerX = (leftPoint._x + rightPoint._x) / 2
    let centerY = (leftPoint._y + rightPoint._y) / 2

    const wGlassesImg = glasses.width;
    const hGlassesImg = glasses.height;

    let wGlasses = positions[16]._x - positions[0]._x;
    let hGlasses = hGlassesImg * wGlasses / wGlassesImg

    let x = (centerX * kImg - wGlasses / 2 * kImg)
    let y = (centerY * kImg - hGlasses / 2 * kImg)

    ctx.translate(x, y)
    ctx.rotate(angle)
    ctx.drawImage(glasses, 0, 0, wGlasses * kImg, hGlasses * kImg)
    ctx.rotate(-angle)
    ctx.translate(-x, -y)
}




class Canvas extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            isFaceLoaded: false,
            isModelsLoaded: false,
            isGlassesLoad: false,
            isLandmarksLoad: false,
            fullDesc: null,
            onTimeId: null,
            canvas: null
        }
    }

    onTime() {
        this.setState({
            onTimeId: null, 
            canvas: this.refs.canvas
        })
        drawScene(this.state)
    }

    async componentDidMount() {
        try {
            await loadModels();
            this.setState({isModelsLoaded: true})
            console.log("model loaded")
        } catch(err) {
            console.log(err)
        }
    }

    async onLoadFace() {
        try{
            let canvas = this.refs.canvas;
            canvas.width = canvas.getContext('2d').canvas.clientWidth;
            canvas.height = canvas.getContext('2d').canvas.clientHeight;
            const imgSrc = this.refs.face
            this.setState({imgH: imgSrc.height, imgW: imgSrc.width})
            this.setState({face: imgSrc})

            this.setState({
                canvas: this.refs.canvas,
                isFaceLoaded: true
            }, () => {
                drawScene(this.state)
            })
            if (this.props.faceNumber != null
                && this.state.isModelsLoaded) {
                this.setState(
                    {
                        fullDesc: await getLandmarks(imgSrc),
                        isLandmarksLoad: true
                    }, () => {
                    drawScene(this.state)
                })
            }
            
        } catch (err) {
            console.log(err);
        }
    }

    async onLoadGlasses() {
        this.setState({
            glasses: this.refs.glasses, 
            isGlassesLoad: true
        }, ()=>{
            if (this.state.isLandmarksLoad)
                drawScene(this.state)
        })
        
    }

    render() {
        const styleImage = {
            display: 'none'
        };

        return (
            <Row fluid style={{height: '100%'}}>
                <Col style={{height: '100%'}}>
                    <img src={faces[this.props.faceNumber]} onLoad={this.onLoadFace.bind(this)} style={styleImage} ref='face' alt='face'/>
                    <img src={glasses[this.props.glassesNumber]} onLoad={this.onLoadGlasses.bind(this)} style={styleImage} ref='glasses' alt='glasses'/>
                    <div>{this.props.faceNumber}</div>
                    <div>{this.props.glassesNumber}</div>
                    <canvas style={{width:'100%',height:'100%'}} ref='canvas'/>
                </Col>
            </Row>
        )
    }
}

export default Canvas