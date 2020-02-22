import React from 'react';
import {getLandmarks} from '../faceapi'



function drawFace(state) {
    let i
    let canvas = state.canvas
    let ctx = canvas.getContext('2d')
    let fullDesc = state.fullDesc
    let faceImg = state.face

    const wImage = faceImg.width;
    const hImage = faceImg.height;

    ctx.drawImage(faceImg, 0, 0, wImage, hImage, 0, 0, wImage, hImage);

    const positions = fullDesc[0].landmarks._positions;

    const indicesEyeLeft = [36, 37, 38, 39, 40, 41, 36];
    ctx.beginPath();
    for (i = 0; i < indicesEyeLeft.length; i++)
    {
      const p = positions[indicesEyeLeft[i]];
      if (i === 0)
        ctx.moveTo(p._x, p._y);
      else
        ctx.lineTo(p._x, p._y);
    }
    ctx.stroke();

    // draw eye right
    const indicesEyeRight = [42, 43, 44, 45, 46, 47, 42];
    ctx.beginPath();
    for (i = 0; i < indicesEyeRight.length; i++)
    {
      const p = positions[indicesEyeRight[i]];
      if (i === 0)
        ctx.moveTo(p._x, p._y);
      else
        ctx.lineTo(p._x, p._y);
    }
    ctx.stroke();
}




class Canvas extends React.Component {

    constructor({face, glasses, isModelLoaded}) {
        super({face, glasses})
        this.state = {
            isModelLoaded: isModelLoaded,
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
                canvas: this.ref.canvas
            })
            drawFace(this.state)
        }
    }

    async componentWillUpdate(nextProps, nextState) {
        try{
            nextProps.face.onLoad = () => {
                this.setState({
                    onTimeId: setImmediate(this.onTime().bind(this), 50)
                })
            }
        } catch (err) {}

        if (this.state.fullDesc == null 
            && nextProps.face != null) {
            this.setState({fullDesc: await getLandmarks(nextProps.face)})
        }
        
    }

    render() {
        return (
            <div>
                <div>{this.props.face}</div>
                <div>{this.props.glasses}</div>
                <canvas height='100%' ref='canvas'/>
            </div>
        )
    }
}

export default Canvas