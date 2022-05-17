import React from 'react';
export default function ErrorMessageModal(props) {
    const errorMsg = props.message || "Error";
    return (
        <div className='error-modal'>
            <div className="modal">
                <p>{ errorMsg }</p>
                <button className="normal-btn">OK</button>
            </div>
            <div className="overlay"></div>
        </div>
    )
}
