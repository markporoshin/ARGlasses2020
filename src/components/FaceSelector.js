import React from 'react';
import {Image, Button, Table} from 'react-bootstrap';
import {MDBTableBody} from 'mdbreact';
import './FaceSelector.css'

import Face001 from './img/faces/face1.jpg';
import Face002 from './img/faces/face2.jpg';
import Face003 from './img/faces/face3.jpg';
import Face004 from './img/faces/face4.jpg';


class FaceSelector extends React.Component {

    constructor({faceCallback}) {
        super({faceCallback})
        this.state = {
            faceCallback: faceCallback
        }
    }

    render() {
        const data = {
            rows:[
                {
                    'handle': <Button onClick={() => {this.state.faceCallback(Face001)}}><Image src={Face001} fluid /></Button>
                  },
                  {
                    'handle': <Button><Image src={Face002} fluid /></Button>
                  },
                  {
                    'handle': <Button><Image src={Face003} fluid /></Button>
                  },
                  {
                    'handle': <Button><Image src={Face004} fluid /></Button>
                  },
        ]}
        return (
            <Table className='table-scroll-y'>
                <MDBTableBody rows={data.rows}/>
            </Table>
        )
    }
}

export default FaceSelector