import React from 'react';
import {Image, Button, Table} from 'react-bootstrap';
import {MDBTableBody} from 'mdbreact';
import '../styles/ScrollTable.css'

import {faces} from '../images'


class FaceSelector extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            faceCallback: props.faceCallback
        }
    }

    render() {
        let rows = [];
        faces.forEach((item, index, __)=>{
            rows.push({'handle': 
                <Image onClick={() => {this.state.faceCallback(index)}} src={item} fluid />
            });
        })
        return (
            <Table className='table-scroll-y'>
                <MDBTableBody rows={rows}/>
            </Table>
        )
    }
}

export default FaceSelector