import React from 'react';
import {Image, Table} from 'react-bootstrap';
import {MDBTableBody} from 'mdbreact';
import '../styles/ScrollTable.css'

import {faces} from '../resource'


class FaceSelector extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            faceCallback: props.faceCallback
        }
    }

    handleImageChange(e) {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            this.props.faceLoadedCallback(reader.result)
        }

        reader.readAsDataURL(file)
    }

    render() {
        let rows = [];
        faces.forEach((item, index) =>{
            rows.push({'handle':
                <Image onClick={() => {this.state.faceCallback(index)}} src={item} fluid />
            });
        })
        return (
        <div style={{height: '100%'}}>
            <form onSubmit={(e)=>this._handleSubmit(e)}>
                <input className="fileInput"
                    type="file"
                    onChange={(e)=>this.handleImageChange(e)} />
            </form>
            <Table className='table-scroll-y'>
                <MDBTableBody rows={rows}/>
            </Table>
        </div>
        )
    }
}

export default FaceSelector
