import React from 'react';
import {Image, Table} from 'react-bootstrap';
import {MDBTableBody} from 'mdbreact';
import '../styles/ScrollTable.css';
import './upload-button.css';

import {faces} from '../resource';


class FaceSelector extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            faceCallback: props.faceCallback
        };
    }

    handleImageChange(e) {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            this.props.faceLoadedCallback(reader.result);
        };

        reader.readAsDataURL(file);
    }

    render() {
        let rows = [];
        faces.forEach((item, index) =>{
            rows.push({'handle':
                <Image onClick={() => {this.state.faceCallback(index);}} src={item} fluid />
            });
        });
        return (
        <div style={{height: '100%'}}>
            <div className="upload-btn-wrapper">
                <button className="btn">{}</button>
                <input type="file" name="myfile"
                       onChange={this.handleImageChange}
                       accept=".jpg, .jpeg, .png"
                />
            </div>
            <Table className='table-scroll-y'>
                <MDBTableBody rows={rows}/>
            </Table>
        </div>
        );
    }
}

export default FaceSelector;
