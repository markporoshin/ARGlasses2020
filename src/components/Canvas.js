import {getLandmarks} from '../faceapi';
import {rims, lins, strings} from '../resource';
import {Form, Spinner, Button, Alert} from 'react-bootstrap';
import Konva from 'react-konva';
import InputRange from 'react-input-range';
import useImage from 'use-image';
import React, {useEffect, useState, useRef} from 'react';
import 'react-input-range/lib/css/index.css';
import {getCoordinates} from './calc';

function min(a, b) {
    return a < b ? a : b;
}

function FaceNotDetected({language}) {
    const [isShow, setShowFlag] = useState(true);

    const header = strings[language]['ohSnap'];
    const body = strings[language]['faceNotDetectedError'];

    if (isShow)
        return (
            <Alert variant="danger" onClose={() => {
                setShowFlag(false);
            }} dismissible>
                <Alert.Heading>{header}</Alert.Heading>
                <p>
                    {body}
                </p>
            </Alert>
        );
    return null;
}


const Canvas = (props) => {
    const detecting = strings[props.language]['Detecting'];
    const linsRef = useRef();
    const rimsRef = useRef();

    const minAlpha = 0;
    const maxAlpha = 10;

    const [stageMigrate, setStageMigrate] = useState(1);
    const [faceImage] = useImage(props.faceImage);
    const [faceSize, setFaceSize] = useState({'k': 1});
    const [faceDesc, setFaceDesc] = useState(null);

    const [linsImage] = useImage(lins[props.glassesNumber]);
    const [rimImage] = useImage(rims[props.glassesNumber]);
    const [glassesScheme, setGlassesScheme] = useState({
        h: 0,
        w: 0,
        x: 0,
        y: 0,
        angle: 0,
        trans: 0
    });
    const [rimUrl, setRimUrl] = useState(null);
    const [linUrl, setLinUrl] = useState(null);

    const [alpha, setAlpha] = useState(0.5);

    const [isLandmarksLoaded, setLanmarks] = useState(false);
    const [isFaceDetected, setFaceDetectedFlag] = useState(true);
    const container = useRef(null);

    const [scale, setScale] = useState(1);
    const [stageX, setStageX] = useState(0);
    const [stageY, setStageY] = useState(0);

    useEffect(()=>{
        const transKoef = glassesScheme.trans;
        // const transKoef = -0.3;
        if (rimImage) {
            const image = new Image();
            image.src = rimImage.src;
            image.onload = function() {
                let width = image.width,
                    height = image.height;
                let context = rimsRef.current.getContext('2d');
                rimsRef.current.width = width*2;
                rimsRef.current.height = height*2;
                for (var i = 0; i <= height / 2; ++i) {
                    context.setTransform(1, -transKoef * i / height,
                        transKoef * i / height, 1, 0, 60);
                    context.drawImage(image,
                        0, height / 2 - i, width, 2,
                        0, height / 2 - i, width, 2);
                    context.setTransform(1, transKoef * i / height,
                        -transKoef * i / height, 1, 0, 60);
                    context.drawImage(image,
                        0, height / 2 + i, width, 2,
                        0, height / 2 + i, width, 2);
                }
            };
            setRimUrl(rimsRef.current);
        }
        if (linsImage){
            const image = new Image();
            image.src = linsImage.src;
            image.onload = function() {
                let width = image.width,
                    height = image.height;
                console.log(width);
                let context = linsRef.current.getContext('2d');
                linsRef.current.width = width*2;
                linsRef.current.height = height*2;
                for (var i = 0; i <= height / 2; ++i) {
                    context.setTransform(1, -transKoef * i / height,
                        transKoef * i / height, 1, 0, 60);
                    context.drawImage(image,
                        0, height / 2 - i, width, 2,
                        0, height / 2 - i, width, 2);
                    context.setTransform(1, transKoef * i / height,
                        -transKoef * i / height, 1, 0, 60);
                    context.drawImage(image,
                        0, height / 2 + i, width, 2,
                        0, height / 2 + i, width, 2);
                }
            };
            setLinUrl(linsRef.current);
        }
        setStageX(stageX+stageMigrate);
        setStageY(stageY+stageMigrate);
        setStageMigrate(-stageMigrate);

    },[glassesScheme, rimImage/*, linsImage, glassesScheme, linUrl, rimUrl*/]);

    useEffect(() => {
        if (faceImage) {
            const ratio = min(container.current.clientHeight / faceImage.height, container.current.clientWidth / faceImage.width);
            setFaceSize({
                'h': faceImage.height * ratio,
                'w': faceImage.width * ratio,
                'k': faceImage.height / faceImage.width,
                'ratio': ratio
            });
            setLanmarks(false);
        }
    }, [faceImage, isLandmarksLoaded, props.faceImage, props.isModelsLoaded]);

    useEffect(() => {
        const loadDecs = async () => {
            setFaceDetectedFlag(true);
            setFaceDesc(await getLandmarks(props.faceImage));
        };
        if (faceImage && props.isModelsLoaded) {
            loadDecs(faceImage);
        }
    }, [faceImage, isLandmarksLoaded, props.faceImage, props.isModelsLoaded]);

    useEffect(() => {
        if (faceDesc && faceDesc[0]) {
            setLanmarks(true);
            setFaceDetectedFlag(true);
        } else if (faceDesc) {
            setFaceDetectedFlag(false);
        }
    }, [faceDesc]);

    useEffect(() => {
        if (isLandmarksLoaded && linsImage && rimImage) {
            setGlassesScheme(getCoordinates(faceDesc[0].landmarks._positions, props.glassesNumber));
        }
    }, [isLandmarksLoaded, rimImage, linsImage, faceDesc, props.glassesNumber]);

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

        stage.scale({x: newScale, y: newScale});
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
        <div style={{width: '100%', height: '100%'}}>
            <canvas
                style={{
                    position: 'absolute',
                    visibility: 'hidden'
                    // border: "red solid"
                }}
                ref={rimsRef}
            />
            <canvas
                style={{
                    position: 'absolute',
                    visibility: 'hidden'
                    // border: "red solid"
                }}
                ref={linsRef}
            />
            {faceImage && faceSize && !isLandmarksLoaded && isFaceDetected !== false &&
            <Button variant="primary" disabled>
                <Spinner
                    as="span"
                    animation="grow"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                />
                {detecting}
            </Button>}
            {isFaceDetected === false &&
            <FaceNotDetected language={props.language}/>}
            <div style={{width: '100%', height: '10%'}}>
                <Form style={{
                    width: '90%',
                    margin: 'auto'
                }}>
                    <InputRange
                        maxValue={maxAlpha}
                        minValue={minAlpha}
                        value={alpha}
                        onChange={setAlpha}
                    />
                </Form>
            </div>
            <div style={{width: '100%', height: '90%'}} ref={container}>
                {container.current &&
                <Konva.Stage
                    height={container.current.clientHeight}
                    width={container.current.clientWidth}
                    onWheel={handleWheel}
                    draggable
                    onDragStart={dragStart}
                    onDragEnd={dragEnd}

                    scaleX={scale}
                    scaleY={scale}
                    x={stageX}
                    y={stageY}
                >
                    {faceImage && faceSize &&
                    <Konva.Layer>
                        <Konva.Image
                            image={faceImage}
                            height={faceSize['h']}
                            width={faceSize['w']}
                            opacity={1}
                        />
                        {linUrl && glassesScheme && isLandmarksLoaded &&
                        <Konva.Image
                            image={linUrl}
                            height={glassesScheme['h'] * faceSize['ratio']*2}
                            width={glassesScheme['w'] * faceSize['ratio']*2}
                            y={glassesScheme['y'] * faceSize['ratio']}
                            x={glassesScheme['x'] * faceSize['ratio']}
                            rotation={glassesScheme.angle}
                            opacity={alpha / (maxAlpha - minAlpha)}
                        />}
                        {rimUrl && glassesScheme && isLandmarksLoaded &&
                        <Konva.Image
                            // image={rimImage}
                            image={rimUrl}
                            // image={canvasRef.current}
                            height={glassesScheme['h'] * faceSize['ratio']*2}
                            width={glassesScheme['w'] * faceSize['ratio']*2}
                            y={glassesScheme['y'] * faceSize['ratio']}
                            x={glassesScheme['x'] * faceSize['ratio']}
                            rotation={glassesScheme.angle}
                            opacity={1}
                        />}
                    </Konva.Layer>}
                </Konva.Stage>}
            </div>
        </div>
    );
};


export default Canvas;
