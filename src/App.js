import React from 'react';
import {Col, Container,Row, Button, ButtonGroup, Pagination, Navbar, backgroundColor, yellow} from 'react-bootstrap';
import './App.css';
import FaceSelector from './components/FaceSelector';
import GlassesSelector from './components/GlassesSelector';
import Logo from './images/logo/glasses.png'
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
          <Navbar bg="light" expand="lg">
            <Navbar.Brand href="#home">
              <img
                src = {Logo}
                width="100"
                height="30"
                className="d-inline-block align-top"
                alt="React Bootstrap logo"
              /> {'  '}
              {strings[this.state.language].APPName}
            </Navbar.Brand>

            <Pagination sm = 'left' size = 'sm' >
              <Pagination.Item active={this.state.language === 'RU'}
                               onClick={()=>{this.setState({language: 'RU'})}}>Русский
              </Pagination.Item>
              <Pagination.Item active={this.state.language === 'EN'} 
                              onClick={()=>{this.setState({language: 'EN'})}}>English
              </Pagination.Item>
            </Pagination>
          </Navbar>
          <br />

        <Row style={{height: '100vh'}}>
          
          <Col sm={2}></Col>
          <Col sm={3} style={{height: '100%'}}>
            <Row style={{height: '30vh'}}>
              {faceSelector}
            </Row>
            <Row style={{height: '20vh'}}></Row>
            <Row style={{height: '30vh'}}>
              {glassesSelector}
            </Row>
             
          </Col>
          
          <Col sm={6} style={{height: '100%'}}>
            <div>{strings[this.state.language].greeting}</div>
            {canvas}
          </Col>
            

        </Row>
      </Container>
    );
  }
}

export default App;
