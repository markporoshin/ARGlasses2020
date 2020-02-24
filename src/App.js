import React from 'react';
import {Col, Container,Row} from 'react-bootstrap';
import './App.css';
import FaceSelector from './components/FaceSelector';
import GlassesSelector from './components/GlassesSelector';
import Canvas from './components/Canvas'
import {loadModels} from './faceapi'

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      selectedFace: null, 
      selectedGlasses: null,
      isModelsLoaded: false,
    }
  
  }

  async componentDidMount() {
    await loadModels();
    this.setState({isModelsLoaded: true})
  }

  faceWasSelected(face) {
    this.setState({selectedFace: face})
  }

  glassesWasSelected(glasses) {
    this.setState({selectedGlasses: glasses})
  }

  render() {
    let canvas = <Canvas face={this.state.selectedFace} 
                         glasses={this.state.selectedGlasses}
                         isModelsLoaded={this.state.isModelsLoaded}/>
    let faceSelector =  <FaceSelector faceCallback={this.faceWasSelected.bind(this)}/>
    let glassesSelector = <GlassesSelector glassesCallback={this.glassesWasSelected.bind(this)}/>
    return (
      <Container fluid>
        <Row style={{ backgroundColor: 'lightblue', height: '100vh'}}>
          
          <Col sm={3} style={{ backgroundColor: 'lightblue', height: '100%'}}>
             {faceSelector}
          </Col>
          
          <Col sm={6} style={{ backgroundColor: 'lightblue', height: '100%'}}>
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
