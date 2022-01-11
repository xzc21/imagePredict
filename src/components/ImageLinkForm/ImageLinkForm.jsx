import React from 'react';
import './ImageLinkForm.css';


const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
    return (
        <div>
            <p className='f3'>
                {'This Magic Brain willl detect faces in your pictures. Give it a try!'}
            </p>
            <div className="center">
                <div className='form center pa4 br2 shadow-5'>
                    <input className="f4 pa2 w-70 center" type="text" placeholder="enter URL" onChange={onInputChange}/>
                    <button className="w-30 grow ba bw1 b--light-purple f4 link ph3 pv2 dib white bg-light-purple" onClick={onButtonSubmit}>Detect</button> 
                </div>
            </div>
        </div>

    );
}

export default ImageLinkForm;