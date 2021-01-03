import React from 'react';
import Modal from '@material-ui/core/Modal';
import ChoreInput from './ChoreInput';

function UpdateModal(props) {
    return <Modal
      open={props.openModal}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      disableBackdropClick>
      <div>
          <ChoreInput handleModalClose={props.handleModalClose} {...props} />    
      </div>
    </Modal>
}

export default UpdateModal;