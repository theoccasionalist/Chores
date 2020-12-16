import { gql, useMutation } from '@apollo/client';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
  } from '@material-ui/pickers';

const textFields = ["name", "description"];

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    }
  },
}));

const CREATE_CHORE = gql`
    mutation CreateChore($input: ChoreInput!) { 
        createChore(input: $input) {_id}	  
    }
`

function CreateChore() {
    const classes = useStyles();
    const [createChore] = useMutation(CREATE_CHORE);
    const [chore] = React.useState({
        name: '',
        description: '',
        dueDate: new Date()
    });
    const [dueDate, setDate] = React.useState(new Date());
    const handleTextChange = (field, text) => {
        chore[field] = text.target.value
    };
    const handleDateChange = (date) => {
        setDate(chore.dueDate = date);
    };
    return <Card className="main-card">
            <h2>Create Chore</h2>
            <form className={classes.root}>

                    {textFields.map((textField, index) => 
                        <TextField 
                            key={index}
                            defaultValue={chore[textField]}
                            required={textField === "name"}
                            label={textField[0].toUpperCase() + textField.substr(1)}
                            onInput={
                                event => {
                                    handleTextChange(textField, event)
                                }
                            }/>
                    )}

                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <Grid>
                            <KeyboardDatePicker
                                disableToolbar
                                format="MM/dd/yyyy"
                                margin="normal"
                                id="date-picker-inline"
                                label="Due Date"
                                minDate={new Date()}
                                value={dueDate}
                                onChange={handleDateChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                        /> <Button onClick={() =>  {
                            createChore({
                                variables: {
                                    "input": chore
                                }
                            });
                            window.location.reload(false);
                            }}>Create</Button> 
                        </Grid>
                    </MuiPickersUtilsProvider>
                    
                    
                </form>
            </Card>
}

export default CreateChore;
