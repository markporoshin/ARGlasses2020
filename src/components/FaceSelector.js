import React from 'react';
import { Image, Table } from 'react-bootstrap';
import { MDBTableBody } from 'mdbreact';
import '../styles/ScrollTable.css';
import './upload-button.css';

import { faces } from '../resource';
import PropTypes from "prop-types";


const FaceSelector = ({ faceLoadedCallback, faceCallback }) => {

    const handleImageChange = (e) => {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            faceLoadedCallback(reader.result);
        };

        reader.readAsDataURL(file);
    };

    return <div style={{ height: '100%' }}>
        <div className="upload-btn-wrapper">
            <button className="btn">{}</button>
            <input type="file" name="myfile"
                onChange={handleImageChange}
                accept=".jpg, .jpeg, .png"
            />
        </div>
        <Table className='table-scroll-y'>
            <MDBTableBody rows={faces.map((item, index) => {return { 'handle':
                    <Image onClick={() => faceCallback(index)} src={item} fluid /> };})}/>
        </Table>
    </div>;
};

FaceSelector.propTypes = {
    faceCallback: PropTypes.func,
    faceLoadedCallback: PropTypes.func
}

export default FaceSelector;
