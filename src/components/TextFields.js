import React from 'react';
import TextField from '@material-ui/core/TextField';

const textFields = ["name", "description"];

function TextFields(props) {
    const [chore] = React.useState({
        name: props.name,
        description: props.description
    });
    return <div>
        {textFields.map((textField, index) => 
            <TextField 
                key={index}
                defaultValue={chore[textField]}
                required={textField === "name"}
                label={textField[0].toUpperCase() + textField.substr(1)}
                onInput={
                    event => {
                        props.handleTextChange(textField, event)
                    }
                }/>
        )}
    </div>
}

export default TextFields;