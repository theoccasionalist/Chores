import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { gql, useMutation } from '@apollo/client';
import CreateChore from './CreateChore';
//COMING SOON: AN UPDATE MODAL!!!
const UPDATE_CHORE = gql`
    mutation MarkChoreComplete($id: String!, $input: ChoreInput!) {
        updateChore(_id: $id, input: $input) {_id}
    }
`

function UpdateChoreModal(props) {
    const body = (
        <CreateChore chore={props} />
      );
}

export default UpdateChoreModal;