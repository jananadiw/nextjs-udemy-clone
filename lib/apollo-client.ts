import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: process.env.GRAPHQL_API_ENDPOINT,
  cache: new InMemoryCache({
    addTypename: false,
  }),
  headers: {
    'x-hasura-admin-secret': `${process.env.GRAPHQL_HASURA_SECRET}`,
  },
});

export default client;
