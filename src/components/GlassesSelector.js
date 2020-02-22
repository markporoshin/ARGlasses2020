import React from 'react';
import {Image, Button, Table} from 'react-bootstrap';
import {MDBTableBody} from 'mdbreact';
import './FaceSelector.css'

import Gl001 from './img/glasses/gl1.png';
import Gl002 from './img/glasses/gl2.png';
import Gl003 from './img/glasses/gl3.png';
import Gl004 from './img/glasses/gl4.png';
import Gl005 from './img/glasses/gl5.png';
import Gl006 from './img/glasses/gl6.png';

class GlassesSelector extends React.Component {

    constructor({glassesCallback}) {
        super({glassesCallback})
        this.state = {
            glassesCallback: glassesCallback
        }
    }

    render() {
        const data = {
            rows:[
                {
                    'handle': <Button onClick={() => {this.state.glassesCallback(Gl001)}}>
                        <Image src={Gl001} fluid /></Button>
                  },
                  {
                    'handle': <Button onClick={() => {this.state.glassesCallback(Gl002)}}>
                        <Image src={Gl002} fluid /></Button>
                  },
                  {
                    'handle': <Button onClick={() => {this.state.glassesCallback(Gl003)}}>
                        <Image src={Gl003} fluid /></Button>
                  },
                  {
                    'handle': <Button onClick={() => {this.state.glassesCallback(Gl004)}}>
                        <Image src={Gl004} fluid /></Button>
                  },
                  {
                    'handle': <Button onClick={() => {this.state.glassesCallback(Gl005)}}>
                        <Image src={Gl005} fluid /></Button>
                  },
                  {
                    'handle': <Button onClick={() => {this.state.glassesCallback(Gl006)}}>
                        <Image src={Gl006} fluid /></Button>
                  },
        ]}
        return (
            <Table className='table-scroll-y'>
                <MDBTableBody rows={data.rows}/>
            </Table>
        )
    }
}

export default GlassesSelector