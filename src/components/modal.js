import React from "react";
import update from './update.module.css'

const ResultModal = props => {
    console.log(props.show, props.newURL)
    const cssModal = [
        update.Modal,
        props.show ? update.ModalOpen : update.ModalClosed
    ];
  return (
    <div className={cssModal.join(' ')}>
        <div>
            {props.newURL}
        </div>
        <button className={update.closeButton} onClick={props.closed}>
            Close
        </button>
    </div>
  );
};

export default ResultModal;