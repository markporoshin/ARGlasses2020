import React from 'react';
import {Row, Container, Image, Button, Table} from 'react-bootstrap';
import {MDBTableBody, MDBTable} from 'mdbreact';
import './FaceSelector.css'

import Face001 from './img/face1.jpg';
import Face002 from './img/face2.jpg';
import Face003 from './img/face3.jpg';
import Face004 from './img/face4.jpg';

const NUM_OF_IMAGES = 4;



class FaceSelector extends React.Component {

    render() {
        const data = {
            rows:[
                {
                    'handle': <Button><Image src={Face001} fluid /></Button>
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