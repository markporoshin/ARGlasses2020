import {getLandmarks} from '../faceapi'
import {rims, lins, strings, rimsCenter} from '../resource'
import {Row, Form, Spinner, Button, Alert} from 'react-bootstrap';
import {Image, Layer, Stage} from 'react-konva';
import InputRange from 'react-input-range'
import useImage from 'use-image';
import React, {useEffect, useState, useRef} from 'react'
import 'react-input-range/lib/css/index.css'


function min(a, b) {
    return a < b ? a : b
}


function FaceNotDetected({language}) {
    const [isShow, setShowFlag] = useState(true)

    const header = strings[language]['ohSnap']
    const body = strings[language]['faceNotDetectedError']

    if (isShow)
      return (
        <Alert variant="danger" onClose={()=>{setShowFlag(false)}} dismissible>
          <Alert.Heading>{header}</Alert.Heading>
          <p>
            {body}
          </p>
        </Alert>
      );
    return null
  }


const Canvas = (props) => {
    const detecting = strings[props.language]['Detecting']

    const minAlpha = 0
    const maxAlpha = 10

    const canvasRef = React.useRef()
    const [faceImage] = useImage(props.faceImage)
    const [faceSize, setFaceSize] = useState({'k': 1})
    const [faceDesc, setFaceDesc] = useState(null)

    const [linsImage] = useImage(lins[props.glassesNumber])
    const [rimImage] = useImage(rims[props.glassesNumber])
    const [glassesScheme, setGlassesScheme] = useState(null)

    const [alpha, setAlpha] = useState(0.5)

    const [isLandmarksLoaded, setLanmarks] = useState(false)
    const [isFaceDetected, setFaceDetectedFlag] = useState(true)
    const container = useRef(null)

    const [scale, setScale]=useState(1);
    const [stageX, setStageX]=useState(0);
    const [stageY, setStageY]=useState(0);

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
            setFaceDetectedFlag(true)
            setFaceDesc(await getLandmarks(faceImage))
        }
        if (faceImage && props.isModelsLoaded) {
            loadDecs(faceImage)
        }
    }, [faceImage, isLandmarksLoaded])

    useEffect(() => {
        if (faceDesc && faceDesc[0]) {
            setLanmarks(true)
            setFaceDetectedFlag(true)
        } else if (faceDesc) {
            setFaceDetectedFlag(false)
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

    const handleWheel = e => {
        e.evt.preventDefault();
        const scaleBy = 0.99;
        const stage = e.target.getStage();
        const oldScale = stage.scaleX();
        const mousePointTo = {
            x: stage.getPointerPosition().x / oldScale - stage.x() / oldScale,
            y: stage.getPointerPosition().y / oldScale - stage.y() / oldScale
        };
        const newScale = e.evt.deltaY > 0 ? oldScale * scaleBy : oldScale / scaleBy;

        stage.scale({ x: newScale, y: newScale });
        setScale(newScale);
        setStageX(-(mousePointTo.x - stage.getPointerPosition().x / newScale) * newScale);
        setStageY(-(mousePointTo.y - stage.getPointerPosition().y / newScale) * newScale);
    };

    const dragStart = () => {};

    const dragEnd = e => {
        setStageX(e.target.x());
        setStageY(e.target.y());
    };

    return (
        <>
            {faceImage && faceSize && !isLandmarksLoaded && isFaceDetected != false? 
                    <Button variant="primary" disabled>
                    <Spinner
                        as="span"
                        animation="grow"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                    />
                    {detecting}
                    </Button>
            : null}
            {isFaceDetected == false ? 
                <FaceNotDetected language={props.language}/>
            : null}
            <Row style={{width:'100%',height:'10%'}}>
                <Form style={{width: '100%'}}>
                    <Form.Label>{strings[props.language].alpha}</Form.Label>
                    <InputRange 
                                maxValue={maxAlpha}
                                minValue={minAlpha}
                                value={alpha}
                                onChange={setAlpha} />
                </Form>
            </Row>
            <Row style={{width:'100%',height:'90%'}} ref={container}>
                {container.current ?
                <Stage
                    height={container.current.clientHeight}
                    width={container.current.clientWidth * faceSize['k']}
                    onWheel={handleWheel}
                    draggable
                    onDragStart={dragStart}
                    onDragEnd={dragEnd}

                    scaleX={scale}
                    scaleY={scale}
                    x={stageX}
                    y={stageY}
                >
                    {faceImage && faceSize ?
                        <Layer>

                            <Image
                                image={faceImage}
                                height={faceSize['h']}
                                width={faceSize['w']}
                                opacity={1}
                            />
                            {(linsImage && glassesScheme && isLandmarksLoaded) ?
                                <Image
                                    image={linsImage}
                                    height={glassesScheme['h'] * faceSize['ratio']}
                                    width={glassesScheme['w'] * faceSize['ratio']}
                                    y={glassesScheme['y'] * faceSize['ratio']}
                                    x={glassesScheme['x'] * faceSize['ratio']}
                                    rotation={glassesScheme.angle}
                                    opacity={alpha / (maxAlpha - minAlpha)}
                                />
                            : null}
                            {(rimImage && glassesScheme && isLandmarksLoaded) ?
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
        </>
    )
}


export default Canvas