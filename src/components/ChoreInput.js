import React from 'react';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button'
import { useMutation } from '@apollo/client';
import { CREATE_CHORE, UPDATE_CHORE } from '../queries';
import ChoreForm from './ChoreForm';

function ChoreInput(props) {
    let buttonContent;
    let Header = () => <h2>{headerContent}</h2>;
    let headerContent;
    let onClickFunction;
    let tempChore = {
        name: "",
        description: "",
        dueDate: new Date()
    } 
    const [createChore] = useMutation(CREATE_CHORE);
    const [updateChore] = useMutation(UPDATE_CHORE);
    if (props.chore) {
        buttonContent = "Update"
        headerContent = "Update Chore";
        var choreId = props.chore._id
        onClickFunction = () => {
            updateChore({
                variables: {
                    "id": choreId,
                    "input": chore
                }
            });
        };
        tempChore.name = props.chore.name;
        tempChore.description = props.chore.description;
        tempChore.completed = props.chore.completed;
        tempChore.dueDate = props.chore.dueDate;
    } else {
        buttonContent = "Create"
        headerContent = "Create Chore";
        onClickFunction = () => {
            createChore({
                variables: {
                    "input": chore
                }
            });
        };
    };
    const [chore] = React.useState(tempChore);
    const handleTextChange = (field, text) => {
      chore[field] = text.target.value
    };
    const handleDateChange = (date) => {
        chore.dueDate = date
    };
    return <Card className="main-card">
                <Header />
                <ChoreForm 
                    {... chore}
                    handleTextChange={handleTextChange}
                    handleDateChange={handleDateChange}
                />
                <Button onClick={() =>  {
                    onClickFunction();
                    window.location.reload(false);
                }}>
                {buttonContent}
                </Button> 
            </Card>
}

export default ChoreInput;
