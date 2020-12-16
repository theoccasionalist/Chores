import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/client';
import './App.css';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Chores from './components/Chores';
import CreateChore from './components/CreateChore';

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
      <br></br>
      <Chores />
      <CreateChore />
    </ApolloProvider>
  );
}

export default App;
