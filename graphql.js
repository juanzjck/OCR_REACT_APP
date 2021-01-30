import { ApolloClient} from 'apollo-client';
import { BACKEND_URL } from '@env'
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory'
import { store } from './store';

import { split, HttpLink } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { WebSocketLink } from '@apollo/client/link/ws';

//const API_URL = "http://32ad881f4a0b.ngrok.io";
//const API_URL = BACKEND_URL;

const {API_URL,WEB_SOCKET}= require('./conf');

const httpLink = new HttpLink({
    uri: API_URL
 })

  const wsLink = new WebSocketLink({
    uri: WEB_SOCKET,
    options: {
      reconnect: true
    }
  });

  const splitLink = split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
      );
    },
    wsLink,
    httpLink,
  );



const authLink = setContext((_, {headers}) => {
      // grab current state
    const state = store.getState();

     const context = {
        headers: {
            ...headers,
        }
    };

    state.login.token!=undefined?(context.headers['authorization']=state.login.token):(console.log('no token: '+state.login.token));
    return context;
});

const client =new ApolloClient({
    link: authLink.concat(splitLink),
    //link: httpLink,
    cache: new InMemoryCache(),
});
export default client;
