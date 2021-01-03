import React from 'react';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useMutation } from '@apollo/client';
import { UPDATE_CHORE, DELETE_CHORE} from './../queries'
import UpdateModal from './UpdateModal';

const convertDate = (date) => {
    const convertDate = new Date(date)
    return (convertDate.getMonth() + 1) + "/" + convertDate.getDate() + "/" + convertDate.getFullYear();
}

function Chore(props) {
    const handleModalOpen = () => {
        setModalOpen(true);
      };
    
    const handleModalClose = () => {
        setModalOpen(false);
    };
    const [chore, setChoreComplete] = React.useState({
        name: props.chore.name,
        description: props.chore.description,
        completed: props.chore.completed,
        dueDate: props.chore.dueDate
    })
    const [openModal, setModalOpen] = React.useState(false);
    const onCompleteClick =() => {
        setChoreComplete(chore.completed = !chore.completed)
    }
    const [deleteChore] = useMutation(DELETE_CHORE);
    const [completeChore] = useMutation(UPDATE_CHORE);
    
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
        <Button onClick={() =>
            handleModalOpen()
        }>Update</Button>
        <UpdateModal handleModalClose={handleModalClose} openModal={openModal} {... props} />
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
