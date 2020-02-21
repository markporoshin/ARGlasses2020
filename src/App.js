import React from 'react';
import {Col, Container,Row} from 'react-bootstrap';
import './App.css';
import FaceSelector from './components/FaceSelector';
import GlassesSelector from './components/GlassesSelector';
import Canvas from './components/Canvas'

function App() {
  return (
    <Container fluid>
      <Row style={{ backgroundColor: 'lightblue', height: '100vh' }}>
        
        <Col sm='3' style={{ backgroundColor: 'lightblue', height: '100%' }}>
          <Row style={{ backgroundColor: 'lightblue', height: '100%' }}>
            <FaceSelector/>
          </Row>
        </Col>
        
        <Col sm='6' style={{ backgroundColor: 'lightblue', height: '100%' }}>
          <Canvas/>
        </Col>
          
        <Col sm='3' style={{ backgroundColor: 'lightblue', height: '100%' }}>
          <GlassesSelector/>
        </Col>

      </Row>
    </Container>
  );
}

export default App;
