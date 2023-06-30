import { GraphQLClient } from 'graphql-request';

const API_URL = `${process.env.HASURA_URL}`;
const SECRET = `${process.env.HASURA_SECRET}`;

export const hasuraClient = new GraphQLClient(API_URL, {
  /*headers: {
    'x-hasura-admin-secret': SECRET,
  },*/
});
