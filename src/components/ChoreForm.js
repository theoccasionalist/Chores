import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import DatePicker from './DatePicker';
import TextFields from './TextFields';

const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '25ch',
      }
    },
  }));


function ChoreForm(props) {
  const classes = useStyles();
  const Form = () => (
      <form className={classes.root}  >
          <TextFields {...props} />
          <DatePicker {...props} />
      </form>
      );
  return <Form />
}

export default ChoreForm;