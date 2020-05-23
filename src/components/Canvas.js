import {getLandmarks} from '../faceapi'
import {faces, rims, lins, strings, hGlassesOffset, glasses, rimsCenter} from '../resource'
import {Col, Row, Card, Form} from 'react-bootstrap';
import {Image, Layer, Stage, Rect} from 'react-konva';
import InputRange from 'react-input-range'
import useImage from 'use-image';
import React, {useCallback, useEffect, useState, useRef} from 'react'
import 'react-input-range/lib/css/index.css'


function min(a, b) {
    return a < b ? a : b
}


const Canvas = (props) => {
    const canvasRef = React.useRef()
    const [faceImage] = useImage(props.faceImage)
    const [faceSize, setFaceSize] = useState({'k': 1})
    const [faceDesc, setFaceDesc] = useState(null)

    const [linsImage] = useImage(lins[props.glassesNumber])
    const [rimImage] = useImage(rims[props.glassesNumber])
    const [glassesScheme, setGlassesScheme] = useState(null)

    const [isLandmarksLoaded, setLanmarks] = useState(false)
    const container = useRef(null)

    useEffect(()=>{
        if (faceImage) {
            const ratio = min(container.current.clientHeight / faceImage.height, container.current.clientWidth / faceImage.width)
            setFaceSize({
                'h': faceImage.height * ratio,
                'w': faceImage.width * ratio,
                'k': faceImage.height / faceImage.width,
                'ratio': ratio
            })
            setLanmarks(false)
        }
    }, [faceImage])

    useEffect(() => {
        const loadDecs = async (faceImage) => {
            setFaceDesc(await getLandmarks(faceImage))
        }
        if (faceImage && props.isModelsLoaded) {
            loadDecs(faceImage)
        }
    }, [faceImage, isLandmarksLoaded])

    useEffect(() => {
        if (faceDesc && faceDesc[0]) {
            setLanmarks(true)
        }
    }, [faceDesc])

    useEffect(()=>{
        if (isLandmarksLoaded && linsImage && rimImage) {
            const positions = faceDesc[0].landmarks._positions
            let leftPoint = positions[36];
            let rightPoint = positions[45];

            const wGlassesImg = rimImage.width
            const hGlassesImg = rimImage.height
            let wGlasses = positions[16]._x - positions[0]._x
            let hGlasses = hGlassesImg * wGlasses / wGlassesImg

            const x = ((leftPoint._x + rightPoint._x) / 2 - wGlasses / 2)
            const imgCenter = rimsCenter[props.glassesNumber];
            const y = ((leftPoint._y + rightPoint._y) / 2 - hGlasses * imgCenter)
            const angle = Math.atan((rightPoint._y - leftPoint._y) / (rightPoint._x - leftPoint._x))

            setGlassesScheme({
                'h': hGlasses,
                'w': wGlasses,
                'x': x,
                'y': y,
                'angle': angle
            })
        }
    }, [isLandmarksLoaded, rimImage, linsImage])



    return (
        <Row style={{width:'100%',height:'100%'}} ref={container}>
            {container.current ?
            <Stage
                height={container.current.clientHeight}
                width={container.current.clientWidth * faceSize['k']}
            >
                {faceImage && faceSize ?
                    <Layer>

                        <Image
                            image={faceImage}
                            height={faceSize['h']}
                            width={faceSize['w']}
                            opacity={1}
                        />
                        {(linsImage && glassesScheme) ?
                            <Image
                                image={linsImage}
                                height={glassesScheme['h'] * faceSize['ratio']}
                                width={glassesScheme['w'] * faceSize['ratio']}
                                y={glassesScheme['y'] * faceSize['ratio']}
                                x={glassesScheme['x'] * faceSize['ratio']}
                                rotation={glassesScheme.angle}
                                opacity={0.5}
                            />
                        : null}
                        {(rimImage && glassesScheme) ?
                            <Image
                                image={rimImage}
                                height={glassesScheme['h'] * faceSize['ratio']}
                                width={glassesScheme['w'] * faceSize['ratio']}
                                y={glassesScheme['y'] * faceSize['ratio']}
                                x={glassesScheme['x'] * faceSize['ratio']}
                                rotation={glassesScheme.angle}
                                opacity={1}
                            />
                        : null}

                    </Layer>
                : null}
            </Stage>
            : null}
        </Row>
    )
}


export default Canvas