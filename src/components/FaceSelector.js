import React from 'react';
import {Image,  Table} from 'react-bootstrap';
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
        faces.forEach((item, index, __)=>{
            rows.push({'handle': 
                <Image onClick={() => {this.state.faceCallback(index)}} src={item} fluid />
            });
        })
      
        return (
        <div style={{height: '100%'}}>
            <form onSubmit={(e)=>this._handleSubmit(e)} method="post" enctype="multipart/form-data" >
            <div>
               <label for="image_uploads">Choose images to upload (PNG, JPG)</label>
                <input 
                    type="file"
                    id="image_uploads"
                    name="image_uploads"
                    accept=".jpg, .jpeg, .png"
                    onChange={(e)=>this.handleImageChange(e)}
                    multiple/>
            </div>
                    <div class="preview">
                        <p>No files currently selected for upload</p>
                    </div>
            </form>
            <Table className='table-scroll-y'>
                <MDBTableBody rows={rows}/>
            </Table>
        </div>
        )
    }
    }
    // const input = document.querySelector('input');
    // const preview = document.querySelector('.preview');
    // input.style.opacity = 0;
    // input.addEventListener('change', updateImageDisplay);
    
    //     function updateImageDisplay() {
    //       while(preview.firstChild) {
    //         preview.removeChild(preview.firstChild);
    //       }
    
    //       const curFiles = input.files;
    //       if(curFiles.length === 0) {
    //         const para = document.createElement('p');
    //         para.textContent = 'No files currently selected for upload';
    //         preview.appendChild(para);
    //       } else {
    //         const list = document.createElement('ol');
    //         preview.appendChild(list);
    
    //         for(const file of curFiles) {
    //           const listItem = document.createElement('li');
    //           const para = document.createElement('p');
    
    //           if(validFileType(file)) {
    //             para.textContent = `File name ${file.name}, file size ${returnFileSize(file.size)}.`;
    //             const image = document.createElement('img');
    //             image.src = URL.createObjectURL(file);
    
    //             listItem.appendChild(image);
    //             listItem.appendChild(para);
    //           } else {
    //             para.textContent = `File name ${file.name}: Not a valid file type. Update your selection.`;
    //             listItem.appendChild(para);
    //           }
    
    //           list.appendChild(listItem);
    //         }
    //       }
    //     }
    //     const fileTypes = [
            
    //         'image/png',
    //         'image/svg+xml',
    //         'image/jpg',
    //         'image/webp',
    //         `image/x-icon`
    //     ];
    //     function validFileType(file) {
    //         return fileTypes.includes(file.type);
    //       }
      
    //       function returnFileSize(number) {
    //         if(number < 1024) {
    //           return number + 'bytes';
    //         } else if(number > 1024 && number < 1048576) {
    //           return (number/1024).toFixed(1) + 'KB';
    //         } else if(number > 1048576) {
    //           return (number/1048576).toFixed(1) + 'MB';
    //         }
    //       }

export default FaceSelector