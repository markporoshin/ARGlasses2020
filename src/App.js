import React from 'react';
import {Col, Container,Row, Button, ButtonGroup, Pagination} from 'react-bootstrap';
import './App.css';
import FaceSelector from './components/FaceSelector';
import GlassesSelector from './components/GlassesSelector';
import Canvas from './components/Canvas'
import {faces, strings} from './resource'
import {loadModels} from './faceapi'

class App extends React.Component {

  constructor(props) {д
    super(props)
    this.state = {
      selectedFaceNumber: null,
      selectedGlassesNumber: null,
      isModelsLoaded: false,
      language: 'RU'
    }
  }

  async componentDidMount() {
    await loadModels().then(()=>{
      this.setState({
        isModelsLoaded: true
      })
    })
  }

  faceWasLoaded(imagePreviewUrl) {
        this.setState({uploadedFace: imagePreviewUrl})
    }

  faceWasSelected(faceInd) {
    this.setState({
      selectedFaceNumber: faceInd,
      uploadedFace: null,
    })
  }

  glassesWasSelected(glassesInd) {
    this.setState({selectedGlassesNumber: glassesInd})
  }

  render() {

    const faceImage = this.state.uploadedFace ? this.state.uploadedFace : faces[this.state.selectedFaceNumber]
    let canvas = <Canvas faceImage={faceImage}
                         glassesNumber={this.state.selectedGlassesNumber}
                         isModelsLoaded={this.state.isModelsLoaded}
                         language={this.state.language}
                         />
    let faceSelector =  <FaceSelector faceCallback={this.faceWasSelected.bind(this)}
                                        faceLoadedCallback={this.faceWasLoaded.bind(this)}
                                        language={this.state.language}/>
    let glassesSelector = <GlassesSelector glassesCallback={this.glassesWasSelected.bind(this)}/>
    let str = strings[this.state.language].greeting

    console.log(str)
    return (
      <Container fluid>
        <Row>
        <Col sm={2}>
          <Pagination>
            <Pagination.Item active={this.state.language === 'RU'}
                             onClick={()=>{this.setState({language: 'RU'})}}>Русский</Pagination.Item>
            <Pagination.Item active={this.state.language === 'EN'}
                             onClick={()=>{this.setState({language: 'EN'})}}>English</Pagination.Item>
          </Pagination>
        </Col>
        <Col sm={10}>
          <div>{strings[this.state.language].APPName}</div>
        </Col>
        </Row>
        <Row style={{height: '100vh'}}>
          
          <Col sm={3} style={{height: '100%'}}>
            <Row style={{height: '100%'}}>
              {faceSelector}
            </Row>
          </Col>
          
          <Col sm={6} style={{height: '100%'}}>
            <div>{strings[this.state.language].greeting}</div>
            {canvas}
          </Col>
            
          <Col sm={3} style={{ backgroundColor: 'lightblue', height: '100%'}}>
            {glassesSelector}
          </Col>

        </Row>
      </Container>
    );
  }
}

export default App;
