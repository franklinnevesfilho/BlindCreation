import React from 'react';
import './Modal.css';
interface ModalProps {
    closeModal: () => void;
    children: React.ReactNode;
}

function Modal(props: ModalProps) {


    return (
        <>
            <div className={'modal-bg'}>
                <div className={'modal'}>
                    <span className={'close'} onClick={props.closeModal}>&times;</span>
                    <div className="modal-content">
                        {props.children}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Modal;