import React from 'react';
import Grid from '@material-ui/core/Grid';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';

function DatePicker(props) {
    const minDate = new Date()
    const [dueDate, setDueDate] = React.useState(props.dueDate);
    const handleDateChange = (event) => {
        setDueDate(event)
    }
    return <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid>
            <KeyboardDatePicker
                disableToolbar
                format="MM/dd/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="Due Date"
                minDate={minDate}
                value={dueDate}
                onChange={date => { 
                    props.handleDateChange(date); 
                    handleDateChange(date);   
                }}
                KeyboardButtonProps={{
                    'aria-label': 'change date',
                }}
        /> 
        </Grid>
    </MuiPickersUtilsProvider> 
}

export default DatePicker;