const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const mongoose = require('mongoose');

const Chore = require('./schema-models/chore.model')

var app = express();

mongoose.connect('mongodb://localhost:27017/chore_oprtnl');
const connection = mongoose.connection;

connection.once('open', () => console.log('MongoDB connection establised.'));

app.listen(4000, ()=> console.log('Exress GraphQL Server Running On localhost:4000'));

const schema = buildSchema(`
    input ChoreInput {
        name: String
        description: String
        completed: Boolean
        dueDate: Date
    }
    enum Order {
        ASC
        DESC
    }
    input SortBy {
        field: String!
        order: Order!
    }
    scalar Date
    type Chore {
        _id: String!
        name: String!
        description: String,
        completed: Boolean!
        dueDate: Date
    }
    type Query {
        getChore(_id: String!): Chore
        getAllChores(sortBy: SortBy): [Chore]
    }
    type Mutation {
        createChore(input: ChoreInput): Chore
        updateChore(_id: String!, input: ChoreInput): Chore
        deleteChore(_id: String!): Chore
    }
`);

const getChore = (arg) => {
    return Chore.findById({_id: arg._id});
};

const getAllChores = (arg) => {
    sortBy = {}
    if (arg.sortBy) {
        sortBy[arg.sortBy.field] = arg.sortBy.order === 'ASC' ? 1 : -1;
        return Chore.find({}).sort(sortBy);
    } else {
        return Chore.find({})
    };
};

const createChore = (arg) => {
    let chore = new Chore(arg.input);
    chore.completed = false;
    chore.save().then(() => {
        return chore;
    })
}

const updateChore = (arg) => {
    return Chore.findByIdAndUpdate({_id: arg._id}, {
        $set: {
            name: arg.input.name,
            desription: arg.input.desription,
            completed: arg.input.completed,
            dueDate: arg.input.dueDate
        }   
    });
}

const deleteChore = (arg) => {
    return Chore.findOneAndDelete({_id: arg._id});
}

const root = {
    getChore: getChore,
    getAllChores: getAllChores,
    createChore: createChore,
    updateChore: updateChore,
    deleteChore: deleteChore
};

app.use('/', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
}));
