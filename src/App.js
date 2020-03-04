import React from 'react';
import {Col, Container,Row, Button, ButtonGroup, Pagination} from 'react-bootstrap';
import './App.css';
import FaceSelector from './components/FaceSelector';
import GlassesSelector from './components/GlassesSelector';
import Canvas from './components/Canvas'

import {strings} from './resource'

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      selectedFaceNumber: null, 
      selectedGlassesNumber: null,
      isModelsLoaded: false,
      language: 'RU'
    }
  }

  

  faceWasSelected(faceInd) {
    this.setState({selectedFaceNumber: faceInd})
  }

  glassesWasSelected(glassesInd) {
    this.setState({selectedGlassesNumber: glassesInd})
  }

  render() {
    let canvas = <Canvas faceNumber={this.state.selectedFaceNumber} 
                         glassesNumber={this.state.selectedGlassesNumber}
                         />
    let faceSelector =  <FaceSelector faceCallback={this.faceWasSelected.bind(this)}/>
    let glassesSelector = <GlassesSelector glassesCallback={this.glassesWasSelected.bind(this)}/>
    let str = strings[this.state.language].greeting

    console.log(str)
    return (
      <Container fluid>
        <Row>
        <Col sm={2}>
          <Pagination>
            <Pagination.Item active={this.state.language === 'RU'} onClick={()=>{this.setState({language: 'RU'})}}>Русский</Pagination.Item>
            <Pagination.Item active={this.state.language === 'EN'} onClick={()=>{this.setState({language: 'EN'})}}>English</Pagination.Item>
          </Pagination>
        </Col>
        <Col sm={10}>
          <div>{strings[this.state.language].APPName}</div>
        </Col>
        </Row>
        <Row style={{height: '100vh'}}>
          
          <Col sm={3} style={{height: '100%'}}>
             {faceSelector}
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
