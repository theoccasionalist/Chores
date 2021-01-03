import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/client';
import './App.css';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Chores from './components/Chores';
import ChoreInput from './components/ChoreInput';

const client = new ApolloClient({
  uri: '/' 
});

function App() {
  return (
    <ApolloProvider client={client}>
      <AppBar position="static">
        <Typography variant="h6">
          Chores
        </Typography>
      </AppBar>
      <Chores />
      <ChoreInput />
    </ApolloProvider>
  );
}

export default App;
