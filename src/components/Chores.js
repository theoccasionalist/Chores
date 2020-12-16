import React from 'react';
import { Query } from 'react-apollo';
import { gql, useQuery } from '@apollo/client';
import Chore from './Chore'
import Divider from '@material-ui/core/Divider';

const GET_ALL_CHORES = gql`
    query {
        getAllChores(sortBy: { field: "dueDate", order: ASC }) {
            _id
            name
            description
            completed
            dueDate
        }
    } 
`;

function Chores() {
    const {loading, error, data} = useQuery(GET_ALL_CHORES);
        if (error) return <p>{`${error}`}</p>
        if (loading) return <h1>Loading</h1>
        if (!data.getAllChores.length) return <h2>No Chores!</h2> 
        if (data.getAllChores.length) return <div>
                    <h2>Chore List</h2> 
                    {data.getAllChores.map((currentChore) => (
                        <div key={currentChore._id}>
                            <Chore chore={currentChore} />
                            <Divider />
                        </div>
                    ))}
                </div>
                   
};

export default Chores;