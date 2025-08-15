// Central Apollo Client setup
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const uri = import.meta.env.VITE_GRAPHQL_ENDPOINT;

export const client = new ApolloClient({
  link: new HttpLink({ uri }),
  cache: new InMemoryCache({
    
  }),
});
