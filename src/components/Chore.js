import React from 'react';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import { gql, useMutation } from '@apollo/client';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
const convertDate = (date) => {
    const convertDate = new Date(date)
    return (convertDate.getMonth() + 1) + "/" + convertDate.getDate() + "/" + convertDate.getFullYear();
}

const MARK_CHORE_COMPLETE = gql`
    mutation MarkChoreComplete($id: String!, $input: ChoreInput!) {
        updateChore(_id: $id, input: $input) {_id}
    }
`

const DELETE_CHORE = gql`
    mutation DeleteChore($id: String!) { 
        deleteChore(_id: $id) {_id}	  
    }
`
function Chore(props) {
    const [chore, setChoreComplete] = React.useState({
        name: props.chore.name,
        description: props.chore.description,
        completed: props.chore.completed,
        dueDate: props.chore.dueDate
    })
    const onCompleteClick =() => {
        setChoreComplete(chore.completed = !chore.completed)
    }
    const [deleteChore] = useMutation(DELETE_CHORE);
    const [completeChore] = useMutation(MARK_CHORE_COMPLETE);
    return <Card>
        <Typography variant="h6">{`Name: ${props.chore.name}`}</Typography>
        {chore.description && <Typography>{`Description: ${props.chore.description}`}</Typography>}
        {chore.completed && <Typography>{`Completed: Yes`}</Typography>}
        {!chore.completed && <Typography>{`Completed: No`}</Typography>}
        {chore.dueDate && <Typography>{"Due Date:" +  convertDate(props.chore.dueDate)}</Typography>}
        <Button onClick={() => {
            
            onCompleteClick();
            completeChore({
                variables: {
                    "id": props.chore._id,
                    "input": chore
                }
            });
            window.location.reload(false);
        }}>
        {chore.completed && 'Mark Incomplete'}
        {!chore.completed && 'Mark Complete'}
        </Button>
        <Button>Update</Button>
        <Button onClick={() => {
            deleteChore({
                variables: {
                    "id": props.chore._id
                }
            });
            window.location.reload(false);
        }}>
        Delete</Button>
    </Card>
};

export default Chore;
