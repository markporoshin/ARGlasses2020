import React from 'react';
import { Image, Table } from 'react-bootstrap';
import { MDBTableBody } from 'mdbreact';
import '../styles/ScrollTable.css';
import './upload-button.css';

import { faces, strings } from '../resource';
import PropTypes from "prop-types";

const FaceSelector = ({ faceLoadedCallback, faceCallback, language }) => {

    const handleImageChange = (e) => {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            faceLoadedCallback(reader.result);
        };

        try {
            reader.readAsDataURL(file);
        } catch (e) {
            console.log(e);
        }
    };

    return <div style={{ height: '100%' }}>
        <div className="upload-btn-wrapper">
            <button className="btn"/>
            <input type="file" name="myfile"
                title={ strings[language]['chooseFile'] }
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
    faceLoadedCallback: PropTypes.func,
    language: PropTypes.string
}

export default FaceSelector;
