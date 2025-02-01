import React from 'react';
import './Modal.css';

const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="modal" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <div className="modal-header" onClick={onClose}>
                    <div className="modal-close">&times;</div>
                </div>
                {children}
            </div>
        </div>
    );
};

export default Modal;