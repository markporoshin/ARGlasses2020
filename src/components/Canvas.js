import React from 'react';
import {getLandmarks, loadModels} from '../faceapi'
import {faces, glasses} from '../images'
import {Col, Container,Row} from 'react-bootstrap';


function drawFace(state) {
    let i
    let canvas = state.canvas
    let ctx = canvas.getContext('2d')
    ctx.fillStyle = "#FF0000";
    ctx.strokeStyle = "#FF0000";
    
    let fullDesc = state.fullDesc
    let faceImg = state.face


    //real size in pixels
    var clientWidth = ctx.canvas.clientWidth;
    var clientHeight = ctx.canvas.clientHeight;

    //canvas coords
    var wCanvas = ctx.canvas.width;
    var hCanvas = ctx.canvas.height;

    const wImage = faceImg.width;
    const hImage = faceImg.height;

    let kx = wCanvas / wImage;
    let ky = hCanvas / hImage;

    let k = (kx) < (ky) ? (kx) : (ky);

    ctx.drawImage(faceImg, 0, 0, wImage * k, hImage * k);

    const positions = fullDesc[0].landmarks._positions;

    const indicesEyeLeft = [36, 37, 38, 39, 40, 41, 36];
    ctx.beginPath();
    for (i = 0; i < indicesEyeLeft.length; i++)
    {
      const p = positions[indicesEyeLeft[i]];
      if (i === 0)
        ctx.moveTo(p._x * k, p._y * k);
      else
        ctx.lineTo(p._x * k, p._y * k);
    }
    ctx.stroke();

    // draw eye right
    const indicesEyeRight = [42, 43, 44, 45, 46, 47, 42];
    ctx.beginPath();
    for (i = 0; i < indicesEyeRight.length; i++)
    {
      const p = positions[indicesEyeRight[i]];
      if (i === 0)
        ctx.moveTo(p._x * k, p._y * k);
      else
        ctx.lineTo(p._x * k, p._y * k);
    }
    ctx.stroke();
}




class Canvas extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            isModelsLoaded: false,
            fullDesc: null,
            onTimeId: null,
            canvas: null
        }
    }

    onTime() {
        if (this.state.fullDesc != null) {

            clearInterval(this.state.onTimeId)
            this.setState({
                onTimeId: null, 
                canvas: this.refs.canvas
            })
            drawFace(this.state)
        }
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
            
            if (this.props.faceNumber != null
                && this.state.isModelsLoaded) {
                
                this.setState({fullDesc: await getLandmarks(imgSrc)})
            }
            this.setState({
                onTimeId: setInterval(this.onTime.bind(this), 50)
            })
        } catch (err) {
            console.log(err);
        }
    }

    render() {
        const styleImage = {
            display: 'none'
        };

        //<canvas style={{width:'100%',height:'100%'}} ref='canvas'/>

        return (
            <Row fluid style={{height: '100%'}}>
                <Col style={{height: '100%'}}>
                    <img src={faces[this.props.faceNumber]} onLoad={this.onLoadFace.bind(this)} style={styleImage} ref='face' alt='face'/>
                    <div>{this.props.faceNumber}</div>
                    <div>{this.props.glassesNumber}</div>
                    <canvas style={{width:'100%',height:'100%'}} ref='canvas'/>
                </Col>
            </Row>
        )
    }
}

export default Canvas