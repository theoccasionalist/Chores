import { gql } from '@apollo/client';

export const CREATE_CHORE = gql`
    mutation CreateChore($input: ChoreInput!) { 
        createChore(input: $input) {_id}	  
    }
`

export const GET_ALL_CHORES = gql`
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

export const UPDATE_CHORE = gql`
    mutation UpdateChore($id: String!, $input: ChoreInput!) {
        updateChore(_id: $id, input: $input) {_id}
    }
`

export const DELETE_CHORE = gql`
    mutation DeleteChore($id: String!) { 
        deleteChore(_id: $id) {_id}	  
    }
`

