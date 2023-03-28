const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const swell = require('./config/connection');

const { typeDefs, resolvers } = require('./schemas');

const PORT = process.env.port || 3001;

const app = express();
const server = new ApolloServer({
    // typeDefs,
    // resolvers,
    // context: 
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../shopbit/'));
})

const startApolloServer = async (typeDefs, resolvers) => {
    await server.start();
    server.applyMiddleware({ app });

    db.once('open', () => {
        app.listen(PORT, () => {
            console.log(`App running on http://localhost:${PORT}`);
            console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
        })
    })
};

startApolloServer(typeDefs, resolvers);