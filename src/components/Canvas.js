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

    const wImage = faceImg.width;
    const hImage = faceImg.height;

    var sizeWidth = ctx.canvas.clientWidth;
    var sizeHeight = ctx.canvas.clientHeight;

    let kh = sizeHeight / hImage;
    let kw = sizeWidth / wImage;

    ctx.drawImage(faceImg, 0, 0, wImage, hImage, 0, 0, sizeWidth, sizeHeight);

    const positions = fullDesc[0].landmarks._positions;

    const indicesEyeLeft = [36, 37, 38, 39, 40, 41, 36];
    ctx.beginPath();
    for (i = 0; i < indicesEyeLeft.length; i++)
    {
      const p = positions[indicesEyeLeft[i]];
      if (i === 0)
        ctx.moveTo(p._x * kw, p._y * kh);
      else
        ctx.lineTo(p._x * kw, p._y * kh);
    }
    ctx.stroke();

    // draw eye right
    const indicesEyeRight = [42, 43, 44, 45, 46, 47, 42];
    ctx.beginPath();
    for (i = 0; i < indicesEyeRight.length; i++)
    {
      const p = positions[indicesEyeRight[i]];
      if (i === 0)
        ctx.moveTo(p._x * kw, p._y * kh);
      else
        ctx.lineTo(p._x * kw, p._y * kh);
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
            const imgSrc = this.refs.face
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
        return (
            <Container fluid style={{height: '100%'}}>
                <Row fluid style={{height: '100%'}}>
                    <Col fluid style={{height: '100%'}}>
                        <img src={faces[this.props.faceNumber]} onLoad={this.onLoadFace.bind(this)} style={styleImage} ref='face' alt='face'/>
                        <div>{this.props.faceNumber}</div>
                        <div>{this.props.glassesNumber}</div>
                        <canvas height='100%' width='100%' ref='canvas'/>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Canvas