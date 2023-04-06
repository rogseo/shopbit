// This file is an example. It will be deleted later.

import { GraphQLClient, gql } from 'graphql-request';
import * as dotenv from 'dotenv';
dotenv.config();

async function main() {
  const endpoint = process.env.ENDPOINT;

  const graphQLClient = new GraphQLClient(endpoint, {
    headers: {
      authorization: process.env.PUBLIC_KEY,
    },
  });
  const query = gql`
    mutation login {
      loginAccount(email: "awoelf@outlook.com", password: "password1") {
        __typename
      }
    }
  `;
  const query1 = gql`
    query checkTokenValidity {
      session {
        accountId
      }
    }
  `;

  const data = await graphQLClient.request(query1);
  console.log(JSON.stringify(data, undefined, 2));
}

main().catch((error) => console.error(error));
