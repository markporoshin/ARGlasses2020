import React from 'react';
import {Image, Button, Table} from 'react-bootstrap';
import {MDBTableBody} from 'mdbreact';
import './FaceSelector.css'

import {glasses} from '../images'

class GlassesSelector extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            glassesCallback: props.glassesCallback
        }
    }

    render() {
        let rows = [];
        glasses.forEach((item, index, __)=>{
            rows.push({'handle': 
            <Button onClick={() => {this.state.glassesCallback(index)}}>
                <Image src={item} fluid />
            </Button>
            });
        })
        return (
            <Table className='table-scroll-y'>
                <MDBTableBody rows={rows}/>
            </Table>
        )
    }
}

export default GlassesSelector