import React from 'react';
import {Col, Container, Row, Pagination} from 'react-bootstrap';
import './App.css';
import FaceSelector from './components/FaceSelector';
import GlassesSelector from './components/GlassesSelector';
import Canvas from './components/Canvas';
import {faces, strings} from './resource';
import {loadModels} from './faceapi';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedFaceNumber: null,
            selectedGlassesNumber: null,
            isModelsLoaded: false,
            language: 'RU'
        };
    }

    async componentDidMount() {
        await loadModels().then(() => {
            this.setState({
                isModelsLoaded: true
            });
        });
    }

    faceWasLoaded(imagePreviewUrl) {
        this.setState({uploadedFace: imagePreviewUrl});
    }

    faceWasSelected(faceInd) {
        this.setState({
            selectedFaceNumber: faceInd,
            uploadedFace: null,
        });
    }

    glassesWasSelected(glassesInd) {
        this.setState({selectedGlassesNumber: glassesInd});
    }

    render() {

        const faceImage = this.state.uploadedFace ? this.state.uploadedFace : faces[this.state.selectedFaceNumber];
        let canvas = <Canvas faceImage={faceImage}
                             glassesNumber={this.state.selectedGlassesNumber}
                             isModelsLoaded={this.state.isModelsLoaded}
                             language={this.state.language}
        />;
        let faceSelector = <FaceSelector faceCallback={this.faceWasSelected.bind(this)}
                                         faceLoadedCallback={this.faceWasLoaded.bind(this)}
                                         language={this.state.language}/>;
        let glassesSelector = <GlassesSelector glassesCallback={this.glassesWasSelected.bind(this)}/>;
        let str = strings[this.state.language].greeting;

        console.log(str);
        return (
            <Container fluid>
                <Row>
                    <Col sm={2}>
                        <Pagination>
                            <Pagination.Item active={this.state.language === 'RU'} onClick={() => {
                                this.setState({language: 'RU'});
                            }}>Русский</Pagination.Item>
                            <Pagination.Item active={this.state.language === 'EN'} onClick={() => {
                                this.setState({language: 'EN'});
                            }}>English</Pagination.Item>
                        </Pagination>
                    </Col>
                </Row>
                <Row style={{height: '100vh'}}>

                    <div style={{
                        height: '100%',
                        width: '33%'
                    }}>
                        <div>
                            {faceSelector}
                        </div>
                    </div>

                    <div style={{
                        height: '100%',
                        width: '33%'
                    }}>
                        {/*<div>{strings[this.state.language].greeting}</div>*/}
                        {canvas}
                    </div>

                    <Col style={{
                        backgroundColor: 'lightblue',
                        height: '100%',
                        width: '34%'
                    }}>
                        {glassesSelector}
                    </Col>

                </Row>
            </Container>
        );
    }
}

export default App;
