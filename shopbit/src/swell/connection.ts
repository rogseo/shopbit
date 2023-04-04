import { GraphQLClient } from 'graphql-request';

export const swellClient = new GraphQLClient(process.env.ENDPOINT || '', {
    headers: {
        authorization: process.env.PUBLIC_KEY || '',
    },
});
