import React, { useEffect, useState } from 'react';
import { Col, Container, Row, Pagination } from 'react-bootstrap';
import './App.css';
import FaceSelector from './components/FaceSelector';
import GlassesSelector from './components/GlassesSelector';
import Canvas from './components/Canvas';
import { faces } from './resource';
import { loadModels } from './faceapi';

const App = () => {
    const [selectedFaceNumber, setSelectedFaceNumber] = useState(null);
    const [selectedGlassesNumber, setSelectedGlassesNumber] = useState(null);
    const [isModelsLoaded, toggleModel] = useState(false);
    const [language, setLanguage] = useState('RU');
    const [uploadedFace, setFace] = useState(undefined);

    useEffect(() => {
        (async()=>{
            await loadModels().then(() => {
                toggleModel(true);
            });
        })().catch((reject) => console.log(reject));
        document.title = "Virtual Glasses"
    }, []);

    const faceWasLoaded = (imagePreviewUrl) => setFace(imagePreviewUrl);

    const faceWasSelected = (faceInd) => {
        setSelectedFaceNumber(faceInd);
        setFace(null);
    };

    const glassesWasSelected = (glassesInd) => setSelectedGlassesNumber(glassesInd);

    return (
        <Container fluid>
            <Row>
                <Col sm={2}>
                    <Pagination>
                        <Pagination.Item active={language === 'EN'} onClick={() => {
                            setLanguage('EN');
                        }}>English</Pagination.Item>
                        <Pagination.Item active={language === 'RU'} onClick={() => {
                            setLanguage('RU');
                        }}>Русский</Pagination.Item>
                    </Pagination>
                </Col>
            </Row>
            <Row style={{ height: '100vh' }}>
                <div style={{ height: '100%', width: '20%' }}>
                    <div>
                        <FaceSelector faceCallback={faceWasSelected}
                            faceLoadedCallback={faceWasLoaded}
                            language={language}/>
                    </div>
                </div>

                <div style={{ height: '100%', width: '60%' }}>
                    <Canvas faceImage={uploadedFace ? uploadedFace : faces[selectedFaceNumber]}
                        glassesNumber={selectedGlassesNumber}
                        isModelsLoaded={isModelsLoaded}
                        language={language}
                    />
                </div>

                <Col style={{ backgroundColor: 'lightblue', height: '100%', width: '20%' }}>
                    <GlassesSelector glassesCallback={glassesWasSelected}/>
                </Col>

            </Row>
        </Container>
    );
};

export default App;
